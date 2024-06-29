// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {GelatoVRFConsumerBase} from "../lib/vrf-contracts/contracts/GelatoVRFConsumerBase.sol";

contract Lottery is GelatoVRFConsumerBase {
    address public moderator;
    address public teamWallet;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public drawDuration = 30 minutes;
    uint256 public drawPot = 0;

    struct Draw {
        uint256 endTime;
        mapping(uint256 => address) participants;
        uint8[] chosenNumbers;
        address[] winners;
        uint256 randomness;
    }

    mapping(uint256 => Draw) public draws;
    uint256 public drawCount;
    address[] public superBowlParticipants;
    uint256 public superBowlRandomness;

    event TicketPurchased(address indexed participant, uint8 number, uint256 drawNumber);
    event DrawEnded(uint256 drawNumber, address[] winners, uint256 prize);
    event SuperBowlDrawEnded(address[] winners, uint256 prize);

    error NotModerator();
    error DrawEndedError();
    error IncorrectTicketPrice();
    error InvalidNumber();
    error NumberAlreadyChosen();

    modifier onlyModerator() {
        if (msg.sender != moderator) {
            revert NotModerator();
        }
        _;
    }

    constructor(address _teamWallet) {
        moderator = 0x9B69F998b2a2b20FF54a575Bd5fB90A5D71656C1;
        teamWallet = _teamWallet;
        _startNewDraw();
    }

    function _startNewDraw() internal {
        drawCount++;
        draws[drawCount].endTime = block.timestamp + drawDuration;
        draws[drawCount].chosenNumbers = new uint8[](0); 
    }

    function startNewDraw() public onlyModerator {
        _startNewDraw();
    }

    function _fulfillRandomness(
        uint256 randomness,
        uint256 requestId,
        bytes memory extraData
    ) internal override {
        if (keccak256(extraData) == keccak256(abi.encode("SuperBowl"))) {
            superBowlRandomness = randomness;
            _selectSuperBowlWinners();
        } else {
            uint256 drawNumber = abi.decode(extraData, (uint256));
            draws[drawNumber].randomness = randomness;
            _selectDrawWinners(drawNumber);
        }
    }

    function changeMod(address _newmod) public onlyModerator() {
        moderator = _newmod;
    }

    function _selectDrawWinners(uint256 drawNumber) internal {
        Draw storage currentDraw = draws[drawNumber];
        if (currentDraw.chosenNumbers.length == 0) return;

        uint256 numWinners = 3; // Fixed number of winners
        uint256 totalPrize = (drawPot * 80) / 100;
        uint256 prizePerWinner = totalPrize / numWinners;

        for (uint256 i = 0; i < numWinners; i++) {
            uint256 winnerIndex = uint256(keccak256(abi.encode(currentDraw.randomness, i))) % currentDraw.chosenNumbers.length;
            address winner = currentDraw.participants[currentDraw.chosenNumbers[winnerIndex]];
            currentDraw.winners.push(winner);
            payable(winner).transfer(prizePerWinner);
        }

        uint256 platformFee = (drawPot * 5) / 100;
        payable(teamWallet).transfer(platformFee);

        // Transfer remaining 5% to Super Bowl fund
        uint256 superBowlFund = (drawPot * 5) / 100;
        payable(teamWallet).transfer(superBowlFund);

        emit DrawEnded(drawNumber, currentDraw.winners, totalPrize);

        drawPot = 0;
        _startNewDraw();
    }

    function _selectSuperBowlWinners() internal {
        if (superBowlParticipants.length == 0) return;

        uint256 numWinners = 3; // Fixed number of winners for Super Bowl
        uint256 totalPrize = address(this).balance; // Super Bowl fund
        uint256 prizePerWinner = totalPrize / numWinners;

        address[] memory winners = new address[](numWinners);

        for (uint256 i = 0; i < numWinners; i++) {
            uint256 winnerIndex = uint256(keccak256(abi.encode(superBowlRandomness, i))) % superBowlParticipants.length;
            address winner = superBowlParticipants[winnerIndex];
            winners[i] = winner;
            superBowlParticipants[winnerIndex] = superBowlParticipants[superBowlParticipants.length - 1];
            superBowlParticipants.pop();
            payable(winner).transfer(prizePerWinner);
        }

        emit SuperBowlDrawEnded(winners, totalPrize);
        delete superBowlParticipants;  // Clear the array
    }

    function _operator() view override internal returns (address) {
        return moderator;
    }

    function buyTicket(uint8 number) external payable {
        if (block.timestamp >= draws[drawCount].endTime) {
            revert DrawEndedError();
        }
        if (msg.value != ticketPrice) {
            revert IncorrectTicketPrice();
        }
        if (number < 1 || number > 100) {
            revert InvalidNumber();
        }

        Draw storage currentDraw = draws[drawCount];
        if (currentDraw.participants[number] != address(0)) {
            revert NumberAlreadyChosen();
        }

        currentDraw.participants[number] = msg.sender;
        currentDraw.chosenNumbers.push(number);
        drawPot += msg.value;

        superBowlParticipants.push(msg.sender);

        emit TicketPurchased(msg.sender, number, drawCount);
    }

    function endDraw() external onlyModerator {
        require(block.timestamp >= draws[drawCount].endTime, "Draw has not ended yet");

        bytes memory extraData = abi.encode(drawCount);
        _requestRandomness(extraData);
    }

    function endSuperBowlDraw() external onlyModerator {
        require(superBowlParticipants.length > 0, "No participants for SuperBowl draw");

        bytes memory extraData = abi.encode("SuperBowl");
        _requestRandomness(extraData);
    }
}

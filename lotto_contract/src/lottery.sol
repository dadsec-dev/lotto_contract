// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {GelatoVRFConsumerBase} from "../lib/vrf-contracts/contracts/GelatoVRFConsumerBase.sol";

contract Lottery is GelatoVRFConsumerBase {
    address public moderator;
    address public teamWallet;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public drawDuration = 30 minutes;
    uint256 public totalSuperBowlFund;
    uint256 public drawCount;
    uint256 public superBowlRandomness;

    struct Draw {
        uint256 endTime;
        uint256 drawPot;
        uint8[] chosenNumbers;
        address[] winners;
        bool isOpen;
        address[] participantsArray;
        mapping(uint256 => address) participants;
        uint256 randomness;
    }

    struct DrawInfo {
        uint256 endTime;
        uint256 drawPot;
        uint8[] chosenNumbers;
        address[] winners;
        bool isOpen;
        address[] participantsArray;
    }

    mapping(uint256 => Draw) public draws;
    mapping(address => uint256) public userXP;
<<<<<<< HEAD
    // uint256 public drawCount;
=======
>>>>>>> d4e069b3b0ff7344aa1cdacf575dc166ecb543ac
    address[] public superBowlParticipants;

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
        moderator = msg.sender;
        teamWallet = _teamWallet;
        _startNewDraw();
    }

    function _startNewDraw() internal {
        drawCount++;
        draws[drawCount].endTime = block.timestamp + drawDuration;
        draws[drawCount].isOpen = true;
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

    function changeMod(address _newMod) public onlyModerator {
        moderator = _newMod;
    }

    function _selectDrawWinners(uint256 drawNumber) internal {
        Draw storage currentDraw = draws[drawNumber];
        if (currentDraw.chosenNumbers.length == 0) return;

        uint256 numWinners = 3;
        uint256 totalPrize = (currentDraw.drawPot * 80) / 100;
        uint256 prizePerWinner = totalPrize / numWinners;

        for (uint256 i = 0; i < numWinners; i++) {
            uint256 winnerIndex = uint256(keccak256(abi.encode(currentDraw.randomness, i))) % currentDraw.chosenNumbers.length;
            address winner = currentDraw.participants[currentDraw.chosenNumbers[winnerIndex]];
            currentDraw.winners.push(winner);
            payable(winner).transfer(prizePerWinner);
        }

        uint256 platformFee = (currentDraw.drawPot * 5) / 100;
        payable(teamWallet).transfer(platformFee);

        uint256 superBowlFund = (currentDraw.drawPot * 15) / 100;
        totalSuperBowlFund += superBowlFund;

        emit DrawEnded(drawNumber, currentDraw.winners, totalPrize);

        currentDraw.isOpen = false;
        _startNewDraw();
    }

    function _selectSuperBowlWinners() internal {
        if (superBowlParticipants.length == 0) return;

        uint256 numWinners = 3;
        uint256 totalPrize = address(this).balance;
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
        delete superBowlParticipants;
    }

    function _operator() internal view override returns (address) {
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
        currentDraw.drawPot += msg.value;
        currentDraw.participantsArray.push(msg.sender);

        superBowlParticipants.push(msg.sender);

        userXP[msg.sender] += 10;

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

    function checkIfWinner(address _address) external view returns (bool) {
        for (uint256 i = 1; i <= drawCount; i++) {
            Draw storage draw = draws[i];
            for (uint256 j = 0; j < draw.winners.length; j++) {
                if (draw.winners[j] == _address) {
                    return true;
                }
            }
        }
        return false;
    }

    function returnDraws() external view returns (DrawInfo[] memory) {
        DrawInfo[] memory allDraws = new DrawInfo[](drawCount);

        for (uint256 i = 1; i <= drawCount; i++) {
            Draw storage draw = draws[i];
            DrawInfo memory drawInfo;
            drawInfo.endTime = draw.endTime;
            drawInfo.drawPot = draw.drawPot;
            drawInfo.chosenNumbers = draw.chosenNumbers;
            drawInfo.winners = draw.winners;
            drawInfo.isOpen = draw.isOpen;
            drawInfo.participantsArray = draw.participantsArray;
            allDraws[i - 1] = drawInfo;
        }

        return allDraws;
    }
}

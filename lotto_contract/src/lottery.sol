// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {GelatoVRFConsumerBase} from "../lib/vrf-contracts/contracts/GelatoVRFConsumerBase.sol";

contract Lottery is GelatoVRFConsumerBase {

    address public moderator;
    address public teamWallet;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public drawDuration = 30 minutes;
    uint256 public totalSuperBowlFund;

    struct Draw {
        uint256 endTime;
        uint256 drawPot;
        uint8[] chosenNumbers;
        address[] winners;
        bool isOpen;
        address[] participantsArray;
        mapping(uint256 => address) participants;
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
    uint256 public drawCount;
    address[] public superBowlParticipants;

    event TicketPurchased(address indexed participant, uint8 number, uint256 drawNumber);
    event DrawEnded(uint256 drawNumber, address[] winners, uint256 prize);
    event SuperBowlDrawEnded(address winner, uint256 prize);

    error NotModerator();
    error drawEnded();
    error IncorrectTicketPrice();
    error InvalidNumber();
    error NumberAlreadyChosen();

    modifier onlyModerator() {
        if (msg.sender != moderator) {
            revert NotModerator();
        }
        _;
    }

    constructor(address _teamWallet) GelatoVRFConsumerBase() {
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

    function fulfillRandomness(uint256 randomness, uint256 requestId, bytes memory extraData) public onlyModerator {
        _fulfillRandomness(randomness, requestId, extraData);
    }

    function _operator() view override internal returns (address) {
        return moderator;
    }

    function buyTicket(uint8 number) external payable {
        if (block.timestamp >= draws[drawCount].endTime) {
            revert drawEnded();
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

        Draw storage currentDraw = draws[drawCount];

        // Logic to select winners using Gelato VRF (omitted for simplicity)
        address[] memory winners = new address[](3); // Assume winners are selected here

        uint256 prize = (currentDraw.drawPot * 80) / 100;

        for (uint256 i = 0; i < winners.length; i++) {
            // Use call to transfer
            (bool sent, ) = winners[i].call{value: prize / winners.length}("");
            require(sent, "Failed to send Ether");
        }

        uint256 platformFee = (currentDraw.drawPot * 5) / 100;
        // Use call to transfer
        (bool sentFee, ) = teamWallet.call{value: platformFee}("");
        require(sentFee, "Failed to send Ether");

        uint256 superBowlFee = (currentDraw.drawPot * 15) / 100;
        totalSuperBowlFund += superBowlFee;

        emit DrawEnded(drawCount, winners, prize);

        currentDraw.isOpen = false;
        _startNewDraw();
    }

        function endSuperBowlDraw() external onlyModerator {
        require(superBowlParticipants.length > 0, "No participants for SuperBowl draw");

        // Logic to select SuperBowl winner using Gelato VRF (omitted for simplicity)
        address winner = superBowlParticipants[0]; // Assume winner is selected here

        uint256 superBowlPrize = address(this).balance; // Assuming the prize is the remaining balance
        (bool sent, ) = winner.call{value: superBowlPrize}("");
        require(sent, "Failed to send Ether");

        emit SuperBowlDrawEnded(winner, superBowlPrize);

        delete superBowlParticipants;
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

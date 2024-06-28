// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {GelatoVRFConsumerBase} from "lib/vrf-contracts/contracts/GelatoVRFConsumerBase";


contract Lottery is GelatoVRFConsumerBase {

    address public moderator;
    address public teamWallet;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public drawDuration = 30 minutes;

    struct Draw {

        uint256 endTime;
        mapping(uint256 => address) participants;
        uint8[] chosenNumbers;
        address[] winners;

    }

    mapping(uint256 => Draws) public draws;
    address[] public superBowlParticipants;

    event TicketPurchsed(address indexed participant, uint16 number, uint16 drawNumber);
    event DrawEnded(uint256 drawNumber, address winner, uint256 prize);
    event SuperBowlDrawEnded(address winner, uint256 prize);

    error NotModerator();
    error DrawEnded();
    error IncorrectTicketPrice();
    error InvalidNumber();
    error NumberAlreadyChosen();
    error SuperBowlDrawNotEnded();

    modifier onlyModerator() {
        if (msg.sender != moderator) {
            revert NotModerator();
        }
        _;
    }

    constructor(address _teamWallet) GelatoVRFConsumerBase("API_KEY", "SUBSCRIPTION_ID") {
        moderator = msg.sender;
        teamWallet = _teamWallet;
        _startNewDraw();
    }

    function buyTicket(uint8 number) external payable {
        if (block.timestamp >= draws[drawNumber].endTime) {
            revert DrawEnded();
        }
        if (msg.value != ticketPrice) {
            revert IncorrectTicketPrice();
        }
        if (number < 1 || number > 100) {
            revert InvalidNumber();
        }

        Draw storage currentDraw = draws[drawNumber];
        if (currentDraw.participants[number] != address(0)) {
            revert NumberAlreadyChosen();
        }

        currentDraw.participants[number] = msg.sender;
        currentDraw.chosenNumbers.push(number);
        drawPot += msg.value;

      
        superBowlParticipants.push(msg.sender);

        emit TicketPurchased(msg.sender, number, drawNumber);
    }

    

}



pragma solidity 0.8.13;

import {GelatoVRFConsumerBase} from "../lib/vrf-contracts/contracts/GelatoVRFConsumerBase.sol";

contract Lottery is GelatoVRFConsumerBase {

    address public moderator;
    address public teamWallet;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public drawDuration = 30 minutes;
    @audit "lets put this into the draw struct to track every draw pot per draw"
    uint256 public drawPot = 0;
    address[] public winners;
    uint256 public totalxp;
    uint256 public totalSuperBowlFund;

    struct Draw {
        uint256 endTime;
        mapping(uint256 => address) participants;
        uint8[] chosenNumbers;
        address[] winners;
        
    }

    mapping(uint256 => Draw) public draws;
    uint256 public drawCount;
    @audit "use mapping"
    address[] public superBowlParticipants;


    event TicketPurchased(address indexed participant, uint8 number, uint256 drawNumber);
    event DrawEnded(uint256 drawNumber, address[] winners, uint256 prize);
    event SuperBowlDrawEnded(address winner, uint256 prize);

    error NotModerator();
    error _drawEnded();
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
    }

    function startNewDraw() public onlyModerator {
        _startNewDraw();
    }

function fulfillRandomness(uint256 randomness, uint256 requestId, bytes memory extraData) public onlyModerator {
        _fulfillRandomness(randomness, requestId, extraData);
}

function _operator() view override internal returns (address){
    return moderator;
}

function buyTicket(uint8 number) external payable {
        if (block.timestamp >= draws[drawCount].endTime) {
            revert _drawEnded();
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
        drawPot += msg.value; @audit "lets put this into the draw struct to track every draw pot per draw";

        superBowlParticipants.push(msg.sender);

        emit TicketPurchased(msg.sender, number, drawCount);
    }

function endDraw() external onlyModerator {
        require(block.timestamp >= draws[drawCount].endTime, "Draw has not ended yet");

        Draw storage currentDraw = draws[drawCount];

        // Logic to select winners using Gelato VRF (omitted for simplicity)
        address[] memory winners = new address[](3); // Assume winners are selected here
        
        drawPot = 0;
        uint256 prize = (drawPot * 80) / 100;

        for (uint256 i = 0; i < winners.length; i++) {
            @audit "use call to transfeer"
            payable(winners[i]).transfer(prize / winners.length);
        }

        uint256 platformFee = (drawPot * 5) / 100;
        @audit "use call to transfeer"
        payable(teamWallet).transfer(platformFee);

        uint256 superBowlFee = (drawPot * 15) / 100;
        // Assume SuperBowl fund logic here

        emit DrawEnded(drawCount, winners, prize);

        @audit "follow check effect interaction can cause reenrancy, do a check that the draw is zero before the loop for winner transfer"
        drawPot = 0;
        _startNewDraw();
}

function endSuperBowlDraw() external onlyModerator {
        require(superBowlParticipants.length > 0, "No participants for SuperBowl draw");

        // Logic to select SuperBowl winner using Gelato VRF (omitted for simplicity)
        address winner = superBowlParticipants[0]; // Assume winner is selected here

        uint256 superBowlPrize = address(this).balance; // Assuming the prize is the remaining balance
        payable(winner).transfer(superBowlPrize);

        emit SuperBowlDrawEnded(winner, superBowlPrize);

        @audit "move it above"
        delete superBowlParticipants;
    }
}

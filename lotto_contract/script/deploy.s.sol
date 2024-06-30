// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Lottery} from "../src/lottery.sol";

contract Deployscript is Script {
    Lottery _game;

    function run() public {
        uint256 key = vm.envUint("PRIVATE_KEY");
        // vm.setNonce(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054, 1300000);
        vm.startBroadcast(key);
        // _rewardToken.mint(address(_stakeerc20), 10000 ether);
        _game = new Lottery( 0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054);
    }
}
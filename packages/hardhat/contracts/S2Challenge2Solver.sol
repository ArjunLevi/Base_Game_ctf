// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChallenge2 {
    // This matches the function in the challenge
    function mintFlag(bytes32 yourKey) external;
}

contract S2Challenge2Solver {
    function solve(address challengeAddress) public {
        // 1. Calculate the key exactly as the challenge does.
        // Inside this function, 'address(this)' is the SOLVER.
        // 'challengeAddress' is the TARGET.
        // We use address(this) because the Challenge will see US as the msg.sender.
        bytes32 key = keccak256(abi.encodePacked(address(this), challengeAddress));

        // 2. Submit the calculated key to the challenge.
        IChallenge2(challengeAddress).mintFlag(key);
    }
}

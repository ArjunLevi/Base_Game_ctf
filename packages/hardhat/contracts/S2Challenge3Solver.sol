// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISeason2Challenge3 {
    function mintFlag() external;
}

contract S2Challenge3Solver {
    // 1. This satisfies the requirement: keccak256(accessKey) == keccak256("LET_ME_IN")
    function accessKey() external pure returns (string memory) {
        return "LET_ME_IN";
    }

    // 2. This function will call the challenge
    function solve(address challengeAddress) external {
        ISeason2Challenge3(challengeAddress).mintFlag();
    }
}

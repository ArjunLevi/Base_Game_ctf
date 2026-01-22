//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface ISeason2Challenge4 {
    function mintFlag() external;
}

contract S2Challenge4Solver {
    address public challengeAddress;

    // We make the constructor payable so we can fund the contract on deployment
    constructor(address _challengeAddress) payable {
        challengeAddress = _challengeAddress;
    }

    function solve() external {
        ISeason2Challenge4(challengeAddress).mintFlag();
    }

    // This function triggers when the Challenge calls msg.sender.call("")
    receive() external payable {
        // We check the balance to ensure we have enough to pay
        require(address(this).balance >= 1 gwei, "Solver needs more ETH");

        // Send exactly 1 gwei back to the challenge to set _paid = true
        (bool ok, ) = msg.sender.call{ value: 1 gwei }("");
        require(ok, "Payment failed");
    }
}

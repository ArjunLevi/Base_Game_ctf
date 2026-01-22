// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChallenge5 {
    function nftContract() external view returns (address);
    function mintFlag(uint[] memory data1, uint[] memory data2) external;
}

interface INFT {
    function tokenIdCounter() external view returns (uint256);
}

contract S2Challenge5Solver {
    function solve(address _challenge) external {
        IChallenge5 challenge = IChallenge5(_challenge);
        INFT nft = INFT(challenge.nftContract());

        uint256 target = nft.tokenIdCounter();

        // Part 1: counter2 = tokenIdCounter % 0x80 (stored in length of data2)
        uint256 length2 = target % 0x80;
        uint[] memory data2 = new uint[](length2);

        // Part 2: counter1 = mload(data1 + 0xD0)
        // 0xD0 is 208 bytes. We need an array large enough.
        uint[] memory data1 = new uint[](10);

        assembly {
            // Store 'target' exactly at memory offset 208 from data1 pointer
            mstore(add(data1, 0xD0), target)
        }

        challenge.mintFlag(data1, data2);
    }
}

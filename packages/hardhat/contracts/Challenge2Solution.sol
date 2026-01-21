//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IChallenge2 {
    function justCallMe() external;
}

contract Challenge2Solution {
    function justCallMe(address _challenge2) public {
        IChallenge2(_challenge2).justCallMe();
    }
}
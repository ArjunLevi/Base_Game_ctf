// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface INFTFlags {
    // Basic ERC721
    function mint(address to, uint256 challengeId) external;
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    // ERC721Enumerable
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);

    // Challenge Logic
    function tokenIdToChallengeId(uint256 tokenId) external view returns (uint256);
    function tokenIdCounter() external view returns (uint256);

    // Authorization Check (Used by S2 to check S1 progress)
    function hasMinted(address user, uint256 challengeId) external view returns (bool);
}

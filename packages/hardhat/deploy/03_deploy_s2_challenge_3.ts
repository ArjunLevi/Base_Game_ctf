import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployS2Challenge3: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const { ethers } = hre;

  // ✅ UPDATED WITH THE CORRECT BUENOS AIRES ADDRESS
  const challengeAddress = "0x2736fD9B1a87cb84f9e3278623AC117f11cD4655";

  console.log("🚀 Deploying S2 Solver...");

  const deployment = await deploy("S2Challenge3Solver", {
    from: deployer,
    args: [],
    log: true,
    // Using reset is safer to ensure a clean state
    waitConfirmations: 1,
  });

  const solver = await ethers.getContractAt("S2Challenge3Solver", deployment.address);

  console.log(`🛰 Calling solve() on the Buenos Aires Challenge...`);

  try {
    const tx = await solver.solve(challengeAddress);
    console.log("⏳ Transaction sent... waiting for confirmation.");
    await tx.wait();
    console.log("✨ SUCCESS! The Buenos Aires Flag (S2) should be yours.");
  } catch (error: any) {
    console.log("❌ Transaction failed!");
    console.error("Reason:", error.reason || error.message);
  }
};

export default deployS2Challenge3;
deployS2Challenge3.tags = ["S2Challenge3"];

//yarn deploy --tags S2Challenge3 --network optimism

//or

//yarn deploy --tags S2Challenge3 --network optimism --reset

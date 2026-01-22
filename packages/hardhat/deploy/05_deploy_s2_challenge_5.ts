import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";

const solveS2Challenge5: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const challengeAddress = "0x13f47F26D948AA2A14A7025e5F95A9b815e0BC68";

  console.log("-------------------------------------------------------");
  console.log("🚀 Deploying Solver for Season 2 Challenge 5...");

  // 1. Deploy the contract using hardhat-deploy
  const deployment = await hre.deployments.deploy("S2Challenge5Solver", {
    from: deployer,
    args: [],
    log: true,
  });

  // 2. Get the contract instance and cast to any to avoid the TS error
  const solver = (await ethers.getContractAt("S2Challenge5Solver", deployment.address)) as any;

  console.log(`🛰  Solver deployed at: ${deployment.address}`);
  console.log("🛰  Calling solve()...");

  try {
    // 3. Call the solve function
    const tx = await solver.solve(challengeAddress, { gasLimit: 500000 });
    await tx.wait();
    console.log("✨ SUCCESS! Flag #5 is yours.");
  } catch (error: any) {
    console.log("❌ Failed.");
    console.error(error.message);
  }
};

export default solveS2Challenge5;
solveS2Challenge5.tags = ["S2Challenge5"];

// yarn deploy --tags S2Challenge5 --network optimism

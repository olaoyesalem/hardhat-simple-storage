const { task } = require("hardhat/config");

task("Block-Number1", "get the block number").setAction(
    async (tasksArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(blockNumber);
    }
);
module.exports = {};

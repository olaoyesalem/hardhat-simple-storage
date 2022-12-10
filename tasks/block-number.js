const { task } = require("hardhat/config");

task("Block-Number", "Prints the current Block number").setAction(
    async (tasksArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Block-Number : ${blockNumber}`)
    }
);


module.exports={};

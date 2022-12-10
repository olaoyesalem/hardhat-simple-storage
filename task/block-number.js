const { config } = require("dotenv");
const {task}= require("hardhat/config");


task("Block-Number", "Prints the current block number").setAction(
    async (taskArgs,hre)=>{
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNumber}`);


    }
)

module.exports ={};
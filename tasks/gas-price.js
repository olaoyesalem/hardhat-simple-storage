const { task } = require("hardhat/config");

task("Gas-Price", "Prints out the gas price ").setAction(async (tasksArgs, hre) => {
    const balance = await hre.ethers.provider.getGasPrice()
    console.log(`Balance: ${balance}`);
});

module.exports = {};

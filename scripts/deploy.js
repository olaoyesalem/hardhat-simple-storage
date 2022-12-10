const { ethers, run, network } = require("hardhat");

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying");
    const simpleStorageContract = await simpleStorageFactory.deploy();
    simpleStorageContract.deployed();
    console.log(`Deplyeeeed!!!!!!!!!!!!!
    Contract Address = ${simpleStorageContract.address}
    `);

    console.log(`Network's chainId: ${network.config.chainId}`);

    if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorageContract.deployTransaction.wait(6);
        await verify(simpleStorageContract.address, []);
        console.log("Verified")
    }

    const currentValue = await simpleStorageContract.retrieve();
    console.log(`Current Value ${currentValue.toString()}`);
    const contractResponse = await simpleStorageContract.Store("7", "70");
    //await contractResponse.wait(3);
    const updatedValue = await simpleStorageContract.retrieve();
    console.log(`Updated value : ${updatedValue.toString()}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract............");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args, // to get errors and print 'em out
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("Already verified")) {
            console.log("Already Verified");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))  // This is for waiting for the function to finsh and printing any error
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });




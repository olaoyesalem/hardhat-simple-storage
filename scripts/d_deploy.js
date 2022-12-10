//imports
const {ethers,network,run} = require("hardhat");

//async main
async function main(){
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorageContract = await simpleStorageFactory.deploy();
    await simpleStorageContract.deployed();
    const chainId = await network.config.chainId;
    console.log("deployed");
    
    console.log(`Contract Address: ${simpleStorageContract.address}`);
    console.log(`Chain Id: ${chainId}`);

    const favNumber = await simpleStorageContract.retrieve();
    console.log(`Favorite Number: ${favNumber.toString()}`);
    
    const Store = await simpleStorageContract.Store("7","09");
    await Store.wait(1);
    const updatedValue = await simpleStorageContract.retrieve();
    console.log(`Updated Number: ${updatedValue.toString()}`);

    if(chainId!==31337&&process.env.ETHERSCAN_API_KEY){
        console.log(" Waiting for Txns");
        await simpleStorageContract.deployTransaction.wait(6);
        await verify(simpleStorageContract.address,[]);
    }

    const addPeoples = await simpleStorageContract.addPeople(7,"Ronaldo");
    const people = await simpleStorageContract.peoples(0);
    console.log(`First Person in the Array is ${people}`);
}

async function verify(contractAddress,args){
    //await simpleStorageContract.deployTransaction.wait(6);// wait for six blocks
    console.log("verifying....");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args, // to get errors and print 'em out
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(e);
        }
    }
    await run("verify:verify",{
        address: contractAddress,
        constructorArgument:args,
    })

}

main()
    .then(() => process.exit(0)) // This is for waiting for the function to finsh and printing any error
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
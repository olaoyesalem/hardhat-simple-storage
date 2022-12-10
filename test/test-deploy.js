const { assert } = require("chai");
const {ethers} = require("hardhat");

describe("SimpleStorage", function(){
    let SimpleStorageFactory,SimpleStorage
    beforeEach( async function(){ // we have to deploy...
         SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
         SimpleStorage = await SimpleStorageFactory.deploy();
         SimpleStorage.deployed();
       })

    it( "should expect favorite number to be 0", async function(){
        const currentValue = await SimpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(),expectedValue);
    })
    it("should expect favorite number to equal product of the passing numbers",async function(){
        const expectedValue = "63";
        await SimpleStorage.Store(7,9);
        const favNumber = await SimpleStorage.retrieve();
        
        
        assert.equal(expectedValue.toString(),favNumber.toString()); 
    })
    it("should expect name to map to favorite number",async function(){
     await SimpleStorage.addPeople(7,"Ronaldo");
     const txnResponse = await SimpleStorage.nametofavNum["Ronaldo"];
     const expectedResult = await SimpleStorage.peoples[0];
        assert.equal(txnResponse,expectedResult);

    })

    it("should expect favorite number to map to name",async function(){
        await SimpleStorage.addPeople(10,"Messi");
        const txnResponse = await SimpleStorage.favNumToName[10];
        const expectedResult = await SimpleStorage.peoples[0];
        assert.equal(txnResponse,expectedResult);
    })
    it.only("should check if name and favorite number is added to struct",async function(){
        await SimpleStorage.addPeople(10,"Messi");
        const txnResponse = await SimpleStorage.peoples[0];
        const expectedResult = await SimpleStorage.peoples[10,"Messi"];


    })
    
})
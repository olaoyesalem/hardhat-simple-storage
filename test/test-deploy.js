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
    it.only("should add both favorite number and name to peoples array",async function(){
       await SimpleStorage.addPeople(7,"Ronaldo");
        const expectedResult = await SimpleStorage.peoples(0);
        assert.equal(txnResponse,expectedResult);

    })
    
})
const { expect } = require("chai");
const { ethers } = require("hardhat");

let accounts;
let room_id = 1;

describe("DerivedContract", function() {
    it("Correct join one player by derived call", async function (){
        accounts = await ethers.getSigners();
        Rpc = await ethers.getContractFactory("RpcGame");
        RpcContract = await Rpc.deploy();
        await RpcContract.deployed();
        
        Derived = await ethers.getContractFactory("DerivedContract");
        myDerived = await Derived.deploy(RpcContract.address);
        await myDerived.deployed();

        await myDerived.derivedCall();

        let response = await RpcContract.rooms(room_id)
        let firstPlayerAddress = Array.from(response)[0].playerAddress;

        expect(response.nPlayers.toNumber()).to.equal(1);
        expect(firstPlayerAddress).to.equal(accounts[0].address);
    })
})

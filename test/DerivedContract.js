const { expect } = require("chai");
const { ethers } = require("hardhat");

let accounts;
let room_id = 1;
/*
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;
  
      const lockedAmount = ONE_GWEI;
      const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const Lock = await ethers.getContractFactory("Lock");
      const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  
      return { lock, unlockTime, lockedAmount, owner, otherAccount };
    }
    describe("Deployment", function () {
        it("Should set the right unlockTime", async function () {
          const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    
          expect(await lock.unlockTime()).to.equal(unlockTime);
        });
    });
});

*/

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
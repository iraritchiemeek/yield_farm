import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@openzeppelin/test-helpers";

describe("PmknFarm", () => {

	let owner: SignerWithAddress;
	let alice: SignerWithAddress;
	let bob: SignerWithAddress;
	let res: any;
	let pmknFarm: Contract;
	let pmknToken: Contract;
	let mockDai: Contract;

	const daiAmount: BigNumber = ethers.utils.parseEther("25000");

	beforeEach(async() => {
		const PmknFarm = await ethers.getContractFactory("PmknFarm");
		const PmknToken = await ethers.getContractFactory("PmknToken");
		const MockDai = await ethers.getContractFactory("MockERC20");

		mockDai = await MockDai.deploy("MockDai", "mDAI");
		[owner, alice, bob] = await ethers.getSigners();
		await Promise.all([
			mockDai.mint(owner.address, daiAmount),
			mockDai.mint(alice.address, daiAmount),
			mockDai.mint(bob.address, daiAmount)
		]);
		pmknToken = await PmknToken.deploy();
		pmknFarm = await PmknFarm.deploy(mockDai.address, pmknToken.address);
	})

	describe("Init", async() => {
		it("should initialize", async() => {
			expect(pmknToken).to.be.ok;
			expect(pmknFarm).to.be.ok;
			expect(mockDai).to.be.ok;
		})
	})

})
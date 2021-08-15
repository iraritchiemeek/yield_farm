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
		const PmknFarm = await ethers.getContactFactory("PmknFarm");
		const PmknToken = await ethers.getContactFactory("PmknToken");
		const MockDai = await ethers.getContactFactory("MockERC20");

		mockDai = wait MockDai.deploy("MockDai", "mDAI");
		[owner, alice, bob] = await ether.getSigners();
		await Promise.all([
			mockDai.mint(owner.address, daiAmount),
			mockDai.mint(alice.address, daiAmount),
			mockDai.mint(bob.address, daiAmount)
		]);
		pmknToken = await PmknToken.deploy();
		pmknFarm = await PmknFarm.deploy(mockDai.address, pmknToken.address);

	})

})
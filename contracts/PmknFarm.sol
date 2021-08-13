pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PmknToken.sol";

contract PmknFarm {

	mapping(address => uint256) public stakingBalance;
	mapping(address => bool) public isStaking;
	mapping(address => uint256) public startTime;
	mapping(address => uint256) public pmknBalance;

	string public name = "TokenFarm";

	IERC20 public daiToken;
	PmknToken public pmknToken;

	event Stake(address indexed from, uint256 amount);
	event Unstake(address indexed from, uint256 amount);
	event YieldWithdraw(address indexed from, uint256 amount);

	constructor(IERC20 _daiToken, PmknToken _pmknToken) {
		daiToken = _daiToken;
		pmknToken = _pmknToken;
	}

	function stake(uint256 amount) public {
		require(amount > 0 && daiToken.balanceOf(msg.sender) >= amount, "You cannot stake zero tokens");

		if (isStaking[msg.sender] == true) {
			uint256 toTransfer = calculateYieldTotal(msg.sender);
			pmknBalance[msg.sender] += toTransfer;
		}

		daiToken.transferFrom(msg.sender, address(this), amount);
		stakingBalance[msg.sender] += amount;
		startTime[msg.sender] = block.timestamp;
		isStaking[msg.sender] = true;
		emit Stake(msg.sender, amnount);
	}

}






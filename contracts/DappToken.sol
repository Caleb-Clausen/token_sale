pragma solidity ^0.5.0;

/**
 * The DappToken contract does this and that...
 */
contract DappToken {
	string public name = 'DApp Token';
	string public symbol = "DAPP";
	string public standard = "DApp Token v1.0";
	uint256 public totalSupply;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value

		);
	

	mapping (address => uint256) public balanceOf;
	

	constructor (uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply; // msg.sender is the address that is deploying the contract
		totalSupply = _initialSupply;
		//allocate the initial supply
	}

	// Transfer
	function transfer(address _to, uint256 _value) public returns (bool success){
	// Exception if account does not have enough 
	require(balanceOf[msg.sender] >= _value); // msg.sender address who is call this function, checking his balance
	// Transfer the Balance
	balanceOf[msg.sender] -= _value;
	balanceOf[_to] += _value;
	// Transfer Event
	emit Transfer(msg.sender, _to, _value);	
	// Return a boolean
	return true;
	}
}

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

	event Approval(
		address indexed _owner,
		address indexed _spender,
		uint256 _value
		);


	
	mapping (address => uint256) public balanceOf;
	mapping (address => mapping (address => uint256)) public allowance;
	
	// allowance

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

	

	// Aprove function(approves the delegate of owner to spend a certain amount of tokens from his wallet to delegate) first part then transfer from uses this
	// Spender is the acocount that I want to approve to spend my tokens
	function approve (address _spender, uint256 _value) public returns (bool success){
	// allowance
	allowance[msg.sender][_spender] = _value;
	//Aprove event
	emit Approval(msg.sender, _spender, _value);

	return true;


	}



	// transferfrom
	
	function transferFrom (address _from, address _to, uint256 _value) public returns(bool success) {
		// Require _from account has enough tokens
		require (_value <= balanceOf[_from]);
		require (_value <= allowance[_from][msg.sender]); // Require allowance is big enough 
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;


		// upadate the allowance

		emit Transfer(_from, _to, _value);


		return true;

		
		
		
		
		// return a bool 
	}
	



}

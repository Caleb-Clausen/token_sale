pragma solidity >=0.5.0;


import "./DappToken.sol";

/**
 * The DappTokenSale contract does this and that...
 */
contract DappTokenSale {
  address payable admin; // gets written to memory
  DappToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

event Sell(address _buyer, uint256 _amount);


  constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice; 
  }

  // multiply 
  function multiply(uint x, uint y) internal pure returns(uint z) {
  	require (y == 0 || (z = x *y)/y == x);
  	
  }
  

  // Buy Tokens 
	function buyTokens (uint256 _numberOfTokens) public payable {
	// Require that value is equal to tokens
	require (msg.value == multiply(_numberOfTokens, tokenPrice));
	
	// Require that the contract has enough tokens
	require (tokenContract.balanceOf(address(this)) >= _numberOfTokens);
	
	// Require that the a transfer is successful, this is the buy functionality
	require (tokenContract.transfer(msg.sender, _numberOfTokens));
	
	// Keep track of the number of tokens sold
	tokensSold += _numberOfTokens;

	// Emit/trigger a sell Event
	emit Sell(msg.sender, _numberOfTokens);

	}


	// Ending the Token Sale
	function endSale() public {
		// Require that only and admin can do this

		require (msg.sender == admin);
		// Transfer remaining dapp tokens to admin
		require (tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
		// Destroy contract
		

		selfdestruct(admin);

		
	}
	

}

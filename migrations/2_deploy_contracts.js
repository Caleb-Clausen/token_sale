
const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale.sol");


module.exports = function (deployer) {
  deployer.deploy(DappToken, 1000000).then(function(){
  // token price is 0.001 Ether	
  var tokenPrice = 1000000000000000;
  return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice); 
  }); // 1000000 is an argument that is used by the constructor
  
};




const DappToken = artifacts.require("DappToken");

module.exports = function (deployer) {
  deployer.deploy(DappToken, 1000000); // 1000000 is an argument that is used by the constructor
};



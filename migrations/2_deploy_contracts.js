var SimonContract = artifacts.require("./SimonContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SimonContract);
};

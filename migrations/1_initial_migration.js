const Web3 = require("web3quorum");
const TruffleConfig = require('../truffle');
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, addresses) {
  const config = TruffleConfig.networks[network];
  const pass = !process.env.ACCOUNT_PASSWORD ? config.account_password : process.env.ACCOUNT_PASSWORD;
  const web3 = new Web3(config.provider());

  if (network === 'in_memory') {
    deployer.deploy(Migrations);
  } else {
    const account = web3.eth.accounts[0];
    web3.personal.unlockAccount(account, pass, 3600);
    setTimeout(() => {
      deployer.deploy(Migrations);
    }, 1000)
  }
};

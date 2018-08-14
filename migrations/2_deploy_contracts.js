const fs = require('fs');
const path = require('path');
const TruffleConfig = require('../truffle');
const Web3 = require("web3quorum");
// const ssoTokenContract = require('../src/contracts/abis/test-contract.js');
const forceToDeploy = !!process.env.CONTRACT_FORCE_DEPLOY || false;

function writeFile(_path, _content) {
  const fileContent = (typeof _content) === 'object' ? JSON.stringify(_content, null, 2) : _content;
  fs.writeFile(
    _path,
    fileContent,
    'utf8',
    function(error) {
      if (!error) {
        console.log(`Success writeFile - path: ${_path}`);
      } else {
        console.log(`Fail to writeFile - path: ${_path}, error: ${error.message}`);
      }
    }
  );
}

function deployContract(deployer, contractObj, contractName) {
  deployer.deploy(contractObj)
  .then((contract) => {
    console.log(`Contract is deployed: address: ${contract.address}, transactionHash: ${contract.transactionHash}`);
    console.log(`Contract abi: ${JSON.stringify(contract.abi)}`);
    return Promise.resolve({address: contract.address, txHash: contract.transactionHash, abi: contract.abi, name: contractName});
  })
  .then((contractTx) => {
    const contractFileTemplate = "const "+contractTx.name+" = ${"+contractTx.name+"};\nmodule.exports = "+contractTx.name+"";
    const _contractJson = {
      "address": contractTx.address,
      "abi": contractTx.abi,
      "name": contractTx.name
    };

    writeFile(
      path.resolve(__dirname, `../src/contracts/abis/${contractTx.name}.js`),
      contractFileTemplate.replace("${"+contractTx.name+"}", JSON.stringify(_contractJson, null, 2))
    );
  });
}

module.exports = function(deployer, network) {
  const config = TruffleConfig.networks[network];
  const web3 = new Web3(config.provider());
  const contracts = process.env.CONTRACTS ? process.env.CONTRACTS.split(",").map(c => c.trim()) : [];

  if (!contracts || contracts.length < 1) {
    console.log("No smart contracts to deploy, you need pass name of contract by 'CONTRACTS=\"contract1, contract2\"'");
    return;
  }

  contracts.forEach(c => {
    const contractToDeploy = artifacts.require(`./${c}.sol`);
    deployContract(deployer, contractToDeploy, c);
  })

};

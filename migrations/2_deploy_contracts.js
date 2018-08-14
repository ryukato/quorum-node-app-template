const fs = require('fs');
const path = require('path');
const TruffleConfig = require('../truffle');
const Web3 = require("web3quorum");

const forceToDeploy = !!process.env.CONTRACT_FORCE_DEPLOY || false;

function writeFile(_path, _content) {
  const fileContent = (typeof _content) === 'object' ? JSON.stringify(_content, null, 2) : _content;
  fs.writeFile(
    _path,
    fileContent,
    'utf8',
    function(error) {
      if (!error) {
        console.info(`Success writeFile - path: ${_path}`);
      } else {
        console.error(`Fail to writeFile - path: ${_path}, error: ${error.message}`);
      }
    }
  );
}

function buildContractJson(contractTx) {
  return {
    "address": contractTx.address,
    "abi": contractTx.abi,
    "name": contractTx.name
  };
}

function deployContract(deployer, contractObj, network, contractName) {
  deployer.deploy(contractObj)
  .then((contract) => {
    return Promise.resolve({address: contract.address, txHash: contract.transactionHash, abi: contract.abi, name: contractName});
  })
  .then((contractTx) => {
    return Promise.resolve(buildContractJson(contractTx));
  })
  .then((createdContract) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.info('createdContract ', createdContract);
        const config = TruffleConfig.networks[network];
        const web3 = new Web3(config.provider());
        web3.eth.getTransactionCount(createdContract.address, (error, nonce) => {
          if (error) {
            console.error(`Fail to deploy smart contract ${contractName} :${error.message}`);
            reject(error);
          }
          if (parseInt(nonce) > 0) {
            console.log(`Smart contract ${contractName} has been successfully deployed. address: ${createdContract.address}`);
            resolve(createdContract);
          } else {
            console.error(`Smart contract ${contractName} is being deployed. address: ${createdContract.address}`);
            resolve(createdContract);
          }
        });
      }, 300);
    })
  })
  .then((deployedContract) => {
    const contractFileTemplate = "const "+deployedContract.name+" = ${"+deployedContract.name+"};\nmodule.exports = "+deployedContract.name+"";
    writeFile(
      path.resolve(__dirname, `../src/contracts/abis/${deployedContract.name}.js`),
      contractFileTemplate.replace("${"+deployedContract.name+"}", JSON.stringify(deployedContract, null, 2))
    );
  })
  .catch((error) => {
    console.error(`Fail to deploy smart contract ${contractName} :${error.message}`);
  });
}

module.exports = function(deployer, network) {
  const contracts = process.env.CONTRACTS ? process.env.CONTRACTS.split(",").map(c => c.trim()) : [];

  if (!contracts || contracts.length < 1) {
    console.warn("No smart contracts to deploy, you need pass name of contract by 'CONTRACTS=\"contract1, contract2\"'");
    return;
  }

  contracts.forEach(c => {
    const contractToDeploy = artifacts.require(`./${c}.sol`);
    deployContract(deployer, contractToDeploy, network, c);
  })

};

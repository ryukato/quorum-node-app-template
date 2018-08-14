// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const TestRPC = require("ganache-cli");
const Web3 = require("web3quorum");

let provider;

module.exports = {
  networks: {
    in_memory: {
      name: 'in_memory',
      provider: function() {
        if (!provider) {
          provider = TestRPC.provider({total_accounts: 10})
        }
        return provider;
      },
      network_id: "*"
    },
    local: {
      name: 'local',
      provider: function() {
        if (!provider) {
          provider = new Web3.providers.HttpProvider("http://localhost:22000");
        }
        return provider;
      },
      gas: 3000000,
      gasPrice: 0,
      network_id: "*"
    }
  }
}


const testContract2 = {
  "address": "0xd0c3714b77a662a695b8ac86424d34a8b6d10a77",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "name": "save",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "key",
          "type": "string"
        }
      ],
      "name": "getValue",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "name": "testContract2"
};
module.exports = testContract2
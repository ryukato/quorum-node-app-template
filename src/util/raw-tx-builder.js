
class RawTxBuilder {
  constructor(context) {
    this.context = context;
  }

  buildRawTxSync(txData){
    this.context.validator.validateTxData(txData);
    const value = txData.value ? txData.value: 0;
    const gas = txData.gas ? txData.gas : 300000;
    const gasPrice = txData.gasPrice ? txData.gasPrice : 0;
    const data = this.encodeFunctionTxData(txData);

    return {
      nonce: this.web3.toHex(txData.nonce),
      gas: this.web3.toHex(gas),  // Never use gasLimit!!!
      gasPrice: this.web3.toHex(gasPrice),
      to: txData.to,
      value: this.web3.toHex(value),
      data: data,
      from: txData.from
    };
  }

}

module.exports = RawTxBuilder;

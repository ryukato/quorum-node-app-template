
class RawTxBuilder {
  constructor(context) {
    this.context = context;
  }

  build(txData) {
    this.validateTxData(txData);
    const value = txData.value ? txData.value: this.context.conf.common.value
    const gas = txData.gas ? txData.gas : this.context.conf.common.gas;
    const gasPrice = txData.gasPrice ? txData.gasPrice : this.context.conf.common.gasPrice;
    const data = this.encodeFunctionTxData(txData);

    return {
      nonce: this.toHex(txData.nonce),
      gas: this.toHex(gas),  // Never use gasLimit!!!
      gasPrice: this.toHex(gasPrice),
      to: txData.to,
      value: this.toHex(value),
      data: data,
      from: txData.from
    };
  }

  encodeFunctionTxData(txData) {
    return this.context.functionDataEncoder.encode(txData.func, txData.types, txData.args);
  }

  toHex(value) {
    return this.context.hexConverter.convert(value);
  }

  validateTxData(txData) {
    if (txData.nonce === undefined) throw new Error(`Invalid transation data - nonce is required`);
    // if (txData.gas === undefined) throw new Error(`Invalid transation data - gas is required`);
    // if (!txData.privateKey) throw new Error(`Invalid transation data - privateKey is required`);
    if (!txData.from) throw new Error(`Invalid transation data - from is required`);
    if (!txData.to) throw new Error(`Invalid transation data - to is required`);
    if (!txData.func) throw new Error(`Invalid transation data - func is required`);
    if (!txData.types) throw new Error(`Invalid transation data - types is required`);
    if (!txData.args) throw new Error(`Invalid transation data - args is required`);
  }
}


module.exports = RawTxBuilder;

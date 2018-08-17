import lightwallet from 'eth-signer';

class FunctionDataEncoder {
  constructor() {}

  encode(func, types, args) {
    this.validate(func, types, args);
    try {
      return '0x'+lightwallet.txutils._encodeFunctionTxData(func, types, args);
    } catch(error) {
      throw new Error(`Fail to encode function data: Invalid data - ${error.message}`);
    }
  }

  validate(func, types, args) {
    if (!func) throw new Error("Fail to encode function data: Invalid data - func is required");
    if (!types) throw new Error("Fail to encode function data: Invalid data - types is required");
    if (!Array.isArray(types)) throw new Error("Fail to encode function data: Invalid data - types have to be Array.");
    if (!args) throw new Error("Fail to encode function data: Invalid data - args is required");
    if (!Array.isArray(args)) throw new Error("Fail to encode function data: Invalid data - args have to be Array.");
  }
}


module.exports = FunctionDataEncoder;

import Tx from 'ethereumjs-tx';

class TxSerializer {
  constructor() {}

  serialize(privateKey, rawTxData) {
    this.validate(privateKey, rawTxData);
    var key = Buffer.from(privateKey, 'hex');
    var tx = new Tx(rawTxData);
    tx.sign(key);
    return tx.serialize();
  }

  verifySignature(serialized) {
    return new Tx(serialized).verifySignature();
  }

  validate(privateKey, rawTxData) {
    if (!privateKey) throw new Error(`Fail to serialize rawTxData: Invalid data - privateKey is required`);
    if (!rawTxData) throw new Error(`Fail to serialize rawTxData: Invalid data - rawTxData is required`);
  }
}

module.exports = TxSerializer;


class TxSender {
  constructor(context) {
    this._context = context;
  }

  sendRawTransaction(txData) {
    return new Promise((resolve, reject) => {
      const transaction = this.buildTransaction(txData);

      try {
        this._context.web3.eth.sendRawTransaction(transaction, function(err, hash) {
          if(!err && hash) {
            resolve(hash);
          } else {
            if (!hash) {
              reject(new Error("Fail to sendRawTransaction - empty hash retured"));
            }
            reject(new Error(`Fail to sendRawTransaction - ${err.message}`));
          }
        });
      } catch(error) {
        reject(new Error(`Fail to sendRawTransaction - ${error.message}`));
      }
    });
  }

  buildTransaction(txData) {
    const rawTxData = this._context.rawTxBuilder.build(txData);
    const serializedTxData = this._context.txSerializer.serialize(rawTxData);

    return `0x${serializedTxData.toString('hex')}`;
  }
}

module.exports = TxSender;

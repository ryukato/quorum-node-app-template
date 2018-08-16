
class TxSender {
  constructor(context) {
    this._context = context;
  }


  sendRawTransaction(txData) {
    return new Promise((resolve, reject) => {
      const transaction = this.buildTransaction(txData);

      try {
        this._context.web3.eth.sendRawTransaction(transaction, function(err, hash) {
          if(!err) {
            // log.debug(`[TxSender - sendRawTransaction] - transaction id: ${hash}`);
            resolve(hash);
          } else {
            // log.error(`[TxSender - sendRawTransaction(Fail)] error=${err}`);
            reject(err);
          }
        });
      } catch(error) {
        return reject(error);
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

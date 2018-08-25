import Utility from './utility';

class TxReceiptor {
  constructor(context) {
    this._context = context;
  }

  queryTxReceipt(txHash) {
    return new Promise((resolve, reject) => {
      this._context.web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
        if (!err) {
          resolve(receipt);
        } else {
          reject(err);
        }
      });
    });
  }

  queryTxReceiptWithDelay(txHash, interval, maxTry) {
    return new Promise(async(resolve, reject) => {
      let receipt = null;
      let tryCnt = 0;

      while(!receipt && tryCnt <= maxTry) {
        try {
          ++tryCnt;
          console.log(`Wait for the receipt of the tx ${txHash} in ${interval * tryCnt} milli-seconds`);
          await Utility.delay(interval * tryCnt);
          receipt = this._context.web3.eth.getTransactionReceipt(txHash);
          if (receipt) {
            resolve(receipt);
            break;
          }
        } catch(error) {
          reject(error);
          break;
        }
      }
      reject(new Error(`Fail to get a receipt for tx ${txHash}`));
      return;
    });
  }
}

module.exports = TxReceiptor;

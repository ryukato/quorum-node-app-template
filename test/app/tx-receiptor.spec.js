import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import TxReceiptor from '../../src/util/tx-receiptor';

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

var count = 0;

const testWeb3ReturnReceiptImmediately = {
  eth: {
    getTransactionReceipt: (tx, cb) => {
      const receipt = {name: 'receipt', status: '0x01'};
      console.log('testWeb3ReturnReceiptImmediately receipt: ', receipt);
      cb(null, {name: 'receipt', status: '0x01'});
    }
  }
};

const testWeb3ReturnsReceiptWithDelay = {
  eth: {
    getTransactionReceipt: (tx, cb) => {
      console.log("count: ", count);
      if (count >= 3) {
        return {name: 'receipt', status: '0x01'};
      } else {
        count++;
        return null;
      }
    },
    getCount: () => {
      return count;
    }
  }
};

const defaultContext = {
  web3: testWeb3ReturnsReceiptWithDelay
};

describe('TxReceiptor spec', () => {
  beforeEach(() => {
    count = 0;
  });

  it('should return testWeb3ReturnReceiptImmediately tx receipt', async () => {
    defaultContext.web3 = testWeb3ReturnReceiptImmediately;

    const txHash = "0x4740b846edd364699511eac181e2054c52ab5b129eb86e48429ac99e99fa9731";
    const txReceiptor = new TxReceiptor(defaultContext);

    expect(txReceiptor.queryTxReceipt(txHash)).to.eventually.not.equal(null);
  });

  it('should return tx receipt after some delay', async () => {
    defaultContext.web3 = testWeb3ReturnsReceiptWithDelay;

    const txHash = "0x4740b846edd364699511eac181e2054c52ab5b129eb86e48429ac99e99fa9731";
    const txReceiptor = new TxReceiptor(defaultContext);
    const interval = 50;
    const maxTry = 3;
    const receipt = await txReceiptor.queryTxReceiptWithDelay(txHash, interval, maxTry);

    console.log("receipt: ", receipt);

    expect(receipt).to.not.equal(null);
    expect(testWeb3ReturnsReceiptWithDelay.eth.getCount()).to.equal(3);
  });

});

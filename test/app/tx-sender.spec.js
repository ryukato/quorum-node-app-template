import chai from 'chai';
import TxSender from '../../src/util/tx-sender';

const expect = chai.expect;
const assert = chai.assert;
const testWeb3 = {
  eth: {
    sendRawTransaction: (tx, cb) => {
      setTimeout(() => {
        cb(null, "testTransactionId");
      }, 100)
    }
  }
};

const defaultContext = {
  rawTxBuilder: {
    build: (txData) => {
      return txData;
    }
  },
  txSerializer: {
    serialize: (rawTxData) => {
      return rawTxData;
    }
  },
  web3: testWeb3
};

const validTx = {
  nonce: 1,
  gas: 300000,
  gasPrice: 0,
  value: 0,
  from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
  to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
  // privateKey: '4205bacfa1fdbbe77b70e250cec5117c1375e83b84d8d75c82788dd2b6ac4edf',
  func: 'test',
  types: ['string'],
  args: ['test']
};

describe('TxSerializer spec', () => {
  beforeEach(() => {});

  it('should send txData', (done) => {
    const txSender = new TxSender(defaultContext);
    txSender.sendRawTransaction(validTx)
    .then((hash) => {
      console.log('has: ', hash);
      expect(hash).to.be.equal("testTransactionId");
      done();
    })
    .catch((error) => {
      done(error);
    });
  });

});

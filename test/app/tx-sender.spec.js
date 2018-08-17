import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import TxSender from '../../src/util/tx-sender';

chai.use(chaiAsPromised);

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

  it('should send txData', () => {
    const txSender = new TxSender(defaultContext);

    return expect(txSender.sendRawTransaction(validTx)).to.eventually.equal("testTransactionId");
  });

  it('should fail to send txData when eth sendRawTransaction throws error', () => {
    const txSender = new TxSender({
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
      web3: {
        eth: {
          sendRawTransaction: (tx, cb) => {
            throw new Error('test error');
          }
        }
      }
    });

    return expect(txSender.sendRawTransaction(validTx)).to.be.rejectedWith(Error);
  });

  it('should fail to send txData, when there is error from eth.sendRawTransaction', () => {
    const txSender = new TxSender({
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
      web3: {
        eth: {
          sendRawTransaction: (tx, cb) => {
            cb(new Error('test error'), "testTransactionId");
          }
        }
      }
    });

    return expect(txSender.sendRawTransaction(validTx)).to.be.rejectedWith(Error);
  });

  it('should fail to send txData, when hash is empty', () => {
    const txSender = new TxSender({
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
      web3: {
        eth: {
          sendRawTransaction: (tx, cb) => {
            cb(null, "");
          }
        }
      }
    });

    return expect(txSender.sendRawTransaction(validTx)).to.be.rejectedWith(Error);
  });

});

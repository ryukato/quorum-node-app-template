import chai from 'chai';
import RawTxBuilder from '../../src/util/raw-tx-builder';

const expect = chai.expect;
const assert = chai.assert;
const defaultContext = {
  functionDataEncoder: {
    encode: (func, types, args) => {
      return "";
    }
  },
  hexConverter: {
    convert: (val) => {
      return val;
    }
  },
  conf: {
    common: {
      gas: 300000,
      gasPrice: 0,
      value: 0
    }
  }
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

describe('RawTxBuilder spec', () => {
  beforeEach(() => {});

  it('should return raw tx', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);
    const rawTxData = rawTxBuilder.build(validTx);
    console.log(rawTxData);
    expect(rawTxData).to.be.a('object');
    expect(rawTxData).to.be.not.equal(null);
  });


});

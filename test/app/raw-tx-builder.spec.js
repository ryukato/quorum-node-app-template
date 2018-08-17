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
      gas: 1,
      gasPrice: 1,
      value: 1
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
  func: 'test',
  types: ['string'],
  args: ['test']
};

describe('RawTxBuilder spec', () => {
  beforeEach(() => {});

  it('should return raw tx', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);
    const rawTxData = rawTxBuilder.build(validTx);

    expect(rawTxData).to.be.a("object");
    expect(rawTxData).to.be.not.equal(null);
  });

  it('should return raw tx even though missing gas', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    delete validTx.gas;

    const rawTxData = rawTxBuilder.build(validTx);

    expect(rawTxData).to.be.a("object");
    expect(rawTxData).to.be.not.equal(null);
    expect(rawTxData.gas).to.be.equal(1);
  });

  it('should return raw tx even though missing value', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    delete validTx.value;

    const rawTxData = rawTxBuilder.build(validTx);

    expect(rawTxData).to.be.a("object");
    expect(rawTxData).to.be.not.equal(null);
    expect(rawTxData.value).to.be.equal(1);
  });

  it('should return raw tx even though missing gasPrice', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    delete validTx.gasPrice;

    const rawTxData = rawTxBuilder.build(validTx);

    expect(rawTxData).to.be.a("object");
    expect(rawTxData).to.be.not.equal(null);
    expect(rawTxData.gasPrice).to.be.equal(1);
  });

  it('should fail to return raw tx because of missing from value', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: 1,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '',
          to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
          func: 'test',
          types: ['string'],
          args: ['test']
        }
      );
    }, Error);
  });

  it('should fail to return raw tx because of missing to value', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: 1,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
          to: '',
          func: 'test',
          types: ['string'],
          args: ['test']
        }
      );
    }, Error);
  });

  it('should fail to return raw tx because of undefined nonce', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: undefined,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
          to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
          func: 'test',
          types: ['string'],
          args: ['test']
        }
      );
    }, Error);
  });

  it('should fail to return raw tx because of missing func value', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: 0,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
          to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
          func: '',
          types: ['string'],
          args: ['test']
        }
      );
    }, Error);
  });

  it('should fail to return raw tx because of undefined types', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: 0,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
          to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
          func: 'test',
          types: undefined,
          args: ['test']
        }
      );
    }, Error);
  });

  it('should fail to return raw tx because of undefined args', () => {
    const rawTxBuilder = new RawTxBuilder(defaultContext);

    assert.throws(() => {
      rawTxBuilder.build(
        {
          nonce: 0,
          gas: 300000,
          gasPrice: 0,
          value: 0,
          from: '0x8818270448edbfd7ac9331270c926fbe5ac2730b',
          to: '0x73c4666c0f0343edb6477323a18bdd9409a69fd3',
          func: 'test',
          types: ['string'],
          args: undefined
        }
      );
    }, Error);
  });

});

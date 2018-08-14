import chai from 'chai';
import RawTxBuilder from '../../src/util/raw-tx-builder';

const expect = chai.expect;
const assert = chai.assert;

describe('RawTxBuilder spec', () => {
  beforeEach(() => {});

  it('should return raw tx synchronously', () => {
    const rawTxBuilder = new RawTxBuilder({});
    const rawTxData = rawTxBuilder.buildRawTxSync({});
    console.log(rawTxData);
    expect(rawTxData).to.be.a('object');
    expect(rawTxData).to.be.not.equal(null);
  });
});

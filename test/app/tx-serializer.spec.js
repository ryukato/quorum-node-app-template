import chai from 'chai';
import TxSerializer from '../../src/util/tx-serializer';

const expect = chai.expect;
const assert = chai.assert;
const privateKey = '4205bacfa1fdbbe77b70e250cec5117c1375e83b84d8d75c82788dd2b6ac4edf';
const rawTx = 'test';

describe('TxSerializer spec', () => {
  beforeEach(() => {});

  it('should return encoded data', () => {
    const txSerializer = new TxSerializer();
    const serializedTx = txSerializer.serialize(privateKey, rawTx);

    expect(serializedTx).to.be.not.equal(null);
    expect(txSerializer.verifySignature(serializedTx)).to.be.true;
  });

  it('should fail to return encoded data with empty privateKey', () => {
    const txSerializer = new TxSerializer();

    assert.throws(() => {
      txSerializer.serialize('', rawTx);
    }, Error);
  });

  it('should fail to return encoded data with empty rawTxData', () => {
    const txSerializer = new TxSerializer();

    assert.throws(() => {
      txSerializer.serialize(privateKey, '');
    }, Error);
  });

});

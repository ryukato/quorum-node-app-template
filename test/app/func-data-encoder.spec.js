import chai from 'chai';
import FunctionDataEncoder from '../../src/util/func-data-encoder';

const expect = chai.expect;
const assert = chai.assert;


describe('FunctionDataEncoder spec', () => {
  beforeEach(() => {});

  it('should return encoded data', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    const encodedData = functionDataEncoder.encode('test', ['string'], ['test']);
    expect(encodedData).to.be.not.equal(null);
    expect(encodedData.startsWith('0x')).to.be.true;
  });

  it('should return encoded data with invalid type', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      const encodedData = functionDataEncoder.encode('test', ['invalid_type'], ['test']);
    }, Error);
  });

  it('should return encoded data with empty types and args', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    const encodedData = functionDataEncoder.encode('test', [], []);
    expect(encodedData).to.be.not.equal(null);
  });

  it('should fail to return encoded data with not array types', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      functionDataEncoder.encode('test', 'type', ['args']);
    }, Error);
  });

  it('should fail to return encoded data with not array args', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      functionDataEncoder.encode('test', ['string'], 'args');
    }, Error);
  });

  it('should fail to return encoded data with empty func parameter', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      functionDataEncoder.encode('', ['string'], ['args']);
    }, Error);
  });

  it('should fail to return encoded data with null types', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      const encodedData = functionDataEncoder.encode('test', null, []);
    }, Error);
  });

  it('should fail to return encoded data with null args', () => {
    const functionDataEncoder = new FunctionDataEncoder();
    assert.throws(() => {
      const encodedData = functionDataEncoder.encode('test', [], null);
    }, Error);
  });
});

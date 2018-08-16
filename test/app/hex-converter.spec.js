import chai from 'chai';
import HexConverter from '../../src/util/hex-converter';

const expect = chai.expect;
const assert = chai.assert;

describe('HexConverter spec', () => {
  beforeEach(() => {});

  it('should return encoded data', () => {
    const hexConverter = new HexConverter();
    const hex = hexConverter.convert(0);

    expect(hex).to.be.not.equal(null);
    expect(hex).to.be.equal('0x0');
  });

  it('should fail to return encoded data when value is null', () => {
    const hexConverter = new HexConverter();
    assert.throws(() => {
      hexConverter.convert(null);
    }, Error);
  });

  it('should fail to return encoded data when value is empty', () => {
    const hexConverter = new HexConverter();
    assert.throws(() => {
      hexConverter.convert('');
    }, Error);
  });

  it('should fail to return encoded data when value is undefined', () => {
    const hexConverter = new HexConverter();
    assert.throws(() => {
      let val;
      hexConverter.convert(val);
    }, Error);
  });
});

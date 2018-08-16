import web3utils from 'web3-utils';

class HexConverter {
  constructor() {}

  convert(val) {
    this.validate(val);
    return web3utils.toHex(val);
  }

  validate(val) {
    if (val === undefined || val == null || val === '') throw new Error(`Fail to hex converting: Invalid value - value is undefined or null`);
  }
}

module.exports = HexConverter;

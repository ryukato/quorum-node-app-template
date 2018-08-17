import Web3 from 'web3';
import Web3Quorum from 'web3quorum';
import httpsProvider from 'web3-ssl-ext-lib';
import fs from 'fs';

class Web3Builder {
  constructor(config) {
    this._config = config;
    this._isSecure = config.tls.isSecure;
    this._Web3 = config.web3.isQuorum ? Web3Quorum : Web3;

    this.buildHttpWeb3 = () => {
      if (!this._config.web3.url) {
        throw new Error("Fail to build web3 with https provider - url is required");
      }
      const httpProvider = new this._Web3.providers.HttpProvider(this._config.web3.url);
      return new this._Web3(httpProvider);
    };

    this.buildHttpsWeb3 = () => {
      if (!this._config.tls.secureUrl || !this._config.tls.secureUrl.startsWith("https")) {
        throw new Error("Fail to build web3 with https provider - url protocol must be secure one.");
      }
      try {
        const key = fs.readFileSync(this._config.tls.key);
        const cert = fs.readFileSync(this._config.tls.cert);
        const ca = fs.readFileSync(this._config.tls.root);
        const rejectUnauthorized = this._config.tls.rejectUnauthorized || true;
        const httpsProviderInstance = new httpsProvider(this._config.tls.secureUrl, key, cert, ca, rejectUnauthorized);

        return new this._Web3(httpsProviderInstance);
      } catch(error) {
        throw new Error(`Fail to build web3 with https provider - ${error.message}`);
      }
    }

  }

  build() {
    if (this._isSecure) {
      return this.buildHttpsWeb3();
    }
    return this.buildHttpWeb3();
  }
}

module.exports = Web3Builder;

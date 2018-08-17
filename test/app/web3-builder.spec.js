import path from 'path';
import chai from 'chai';
import Web3Builder from '../../src/util/web3-builder';

const expect = chai.expect;
const assert = chai.assert;

describe('Web3Builder spec', () => {
  beforeEach(() => {});

  it('should return web3 with http provider', () => {
    const web3Builder = new Web3Builder({
      tls: {
        isSecure: false
      },
      web3: {
        isQuorum: false,
        url: "http://localhost:22000"
      }
    });

    const web3 = web3Builder.build();
    expect(web3.currentProvider.host).to.be.equal('http://localhost:22000');
  });

  it('should return web3 with https provider', () => {
    const web3Builder = new Web3Builder({
      tls: {
        isSecure: true,
        secureUrl: "https://localhost:22000",
        key: path.resolve(__dirname, './tls/ca.key'),
        cert: path.resolve(__dirname, './tls/ca.crt'),
        root: path.resolve(__dirname, './tls/server.crt'),
        rejectUnauthorized: true
      },
      web3: {
        isQuorum: false,
        url: "https://localhost:22000"
      }
    });

    const web3 = web3Builder.build();
    expect(web3.currentProvider.host).to.be.equal('https://localhost:22000');
  });

  it('should fail to return web3 with https provider, but no url', () => {
    const web3Builder = new Web3Builder({
      tls: {
        isSecure: false
      },
      web3: {
        isQuorum: false
      }
    });

    assert.throws(() => {
      const web3 = web3Builder.build();
    }, Error);
  });

  it('should fail to return web3 with https provider, but not secure url', () => {
    const web3Builder = new Web3Builder({
      tls: {
        isSecure: true,
        secureUrl: "http://localhost:22000"
      },
      web3: {
        isQuorum: false,
        url: "http://localhost:22000"
      }
    });

    assert.throws(() => {
      const web3 = web3Builder.build();
    }, Error);
  });

  it('should fail to return web3 with https provider because of not existing key', () => {
    const web3Builder = new Web3Builder({
      tls: {
        isSecure: true,
        secureUrl: "https://localhost:22000",
        key: path.resolve(__dirname, './tls/not_exists.key'),
        rejectUnauthorized: true
      },
      web3: {
        isQuorum: false,
        url: "https://localhost:22000"
      }
    });

    assert.throws(() => {
      const web3 = web3Builder.build();
    }, Error);
  });

});

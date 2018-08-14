
import chai from 'chai';
import AppServer from '../../src/server';

const expect = chai.expect;

class TestRouter {
  constructor(conf) {
  }

  register(app) {
    console.log('[TestRouter - register] app: ', app);
  }
}

describe('Api Server test', () => {

  const routers = [ TestRouter, TestRouter ];
  console.log('routers: ', routers);
  it('should create server', () => {
    const apiServer = new AppServer();
    apiServer.initApp({ port: 3000 }, routers);

    setTimeout(() => {
      console.log('server isRunning1: ', apiServer.isRunning());
      apiServer.stopServer();
    }, 500);

    apiServer.startServer();
  });
});

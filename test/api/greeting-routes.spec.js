const debug = require('debug')('DEBUG');

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import proxyquire from 'proxyquire';
import supertest from 'supertest';
import chai from 'chai';

const assert = chai.assert;

import GreetingRoutes from '../../src/routes/greeting-routes';

describe('Create GreetingRoutes', () => {
  it('should fail to create GreetingRoutes, since invalid controller', () => {
    assert.throws(() => {
      new GreetingRoutes({}, null)
    },
    Error);
  });

  it('should fail to create GreetingRoutes, since controller not implementing sayHello', () => {
    assert.throws(() => {
      new GreetingRoutes({}, {})
    },
    Error);
  });

  it('should fail to create GreetingRoutes, since controller not implementing newGreeting', () => {
    assert.throws(() => {
      new GreetingRoutes({}, {sayHello: (req, res) => {}})
    },
    Error);
  });
});

describe('GreetingRoutes test', () => {
  let app, request, router;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const GreetingRoutes = proxyquire('../../src/routes/greeting-routes.js', {});
    const greetController = require('../../src/controllers/greet-controller');

    router = new GreetingRoutes({}, greetController);
    router.register(app);
    request = supertest(app);
  });



  describe('POST /greet test', () => {
    it('should return 201', (done) => {
      request.post('/greet')
      .send({
        lang: 'ko',
        message: 'hi'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .then(res => {

        debug('res body %s', JSON.stringify(res.body));
        done();
      }).catch(err => {
        done(err);
      });
    });
  });
});

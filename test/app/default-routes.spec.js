const debug = require('debug')('DEBUG');

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import proxyquire from 'proxyquire';
import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

describe('Default routes test', () => {
  let app, request, defaultRouter;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const DefaultRouter = proxyquire('../../src/routes/default-routes.js', {});

    defaultRouter = new DefaultRouter({});
    defaultRouter.register(app);
    request = supertest(app);
  });
  describe('Fail to register', () => {
    it('should fail to register routes to app', () => {
      const DefaultRouter = proxyquire('../../src/routes/default-routes.js', {});
      defaultRouter = new DefaultRouter({});

      assert.throws(() => {
        defaultRouter.register(null);
      }, Error);
    });
  });

  describe('POST / test', () => {
    it('should return 200', (done) => {
      request.post('/')
      .send({
        lang: 'ko',
        message: 'hi'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        debug('res body %s', JSON.stringify(res.body));
        done();
      }).catch(err => {
        done(err);
      });
    });

  });

  describe('GET / test', () => {
    it('should return 200', (done) => {
      request.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        debug('res body %s', JSON.stringify(res.body));
        done();
      }).catch(err => {
        done(err);
      });
    });

  });

});

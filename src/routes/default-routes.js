'use strict';

import express from 'express';

class DefaultRouter {
  /**
  @constructor

  @param {Object} app - An instance of express.
  @param {Object} conf - Containing configuration for appliation routes.
  */
  constructor(conf) {
    this.router = express.Router();
    this.defaultResBody = { message: 'hello' };
  }

  /**
  * Override required
  */
  register(app) {
    if (!app) {
      throw new Error('Fail to register routes - Invalid app');
    }

    app.use('/', this.router);

    this.router.get('/', this.buildAsyncHandler(async (req, res, next) => {
      res.json(this.defaultResBody);
    }));

    this.router.post('/', this.buildAsyncHandler(async (req, res, next) => {
      res.json(this.defaultResBody);
    }));
  }

  buildAsyncHandler(handler) {
    const _this = this;
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch(err) {
        if (!!next) {
          next(err);
        } else {
          _this.handleInternalServerError(req, res, error, errorMsg);
        }
      }
    };
  }

  /**
  * Override required if want to add custom logic
  */
  handleInternalServerError(req, res, error, msg) {
    res.setHeader(500, {'Content-Type': 'application/json'});
    res.json(this.buildErrorResponseBody(req, error, msg));
  }

  /**
  * Override required if want to add custom logic
  */
  handleBadRequest(req, res) {
    res.setHeader(400, {'Content-Type': 'application/json'});
    res.json(this.buildErrorResponseBody(req, new Error('Invalid Request'), 'Invalid Request'));
  };

  /**
  * Override required if want to add custom logic
  */
  handleSuccessResult(req, res, result) {
    const resJson = JSON.stringify(result);
    res.setHeader('content-type', 'application/json');
    res.json(result);
  };

  /**
  * Override required if want to add custom logic
  */
  handleNoAuthrorization(req, res) {
    res.setHeader(401, {'Content-Type': 'application/json'});
    res.json({"error": "Unauthorized request"});
  };

  buildErrorResponseBody(req, error, msg) {
    return {
      'error': msg ? msg : `Fail to call [${req.method} ${req.originalUrl}] with body: ${JSON.stringify(req.body)}`,
      'detail': error.message
    };
  }
}

module.exports = DefaultRouter;

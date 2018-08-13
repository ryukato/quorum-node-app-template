'use strict';

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import moment from 'moment';
import RateLimit from 'express-rate-limit';

const logger = require('./logger/logger.js');
const debug = require('debug')('http');

class AppServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  startServer() {
    this.server.listen(this.config.port);
  }

  stopServer() {
    this.server.close();
  }

  isRunning() {
    return this.server.listening;
  }

  initApp(config, routers) {
    logger.info(`Init Application with configuration: ${JSON.stringify(config, null, 4)}`);
    this.config = config;
    this.routers = [...routers];

    this.configMorganLogger(config);

    this.configRateLimit(config);

    this.registerRoutesToApp(this.config, this.app, this.routers);
    this.registerErrorHandler(this.config, this.app);

    this.registerServerErrorHandler(this.config, this.server);
    this.registerServerListeningHandler(this.config, this.server);
  }

  configRateLimit(config) {
    if (config.rateLimit && config.rateLimit.enable === true) {
      const requestLimiter = this.buildRateLimitter(config);

      this.app.use(requestLimiter);
    }
  }

  buildRateLimitter(config) {
    return new RateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
      delayMs: config.rateLimit.delayMs,
      headers: config.rateLimit.headers,
      keyGenerator: config.rateLimit.keyGenerator
    });
  }

  configMorganLogger(config) {
    morgan.token('vmProcessIdx', () => {
      const vmIdx = config.vm ? config.vm.index || 1 : 1;
      const processIdx = config.process ? config.process.index || 1 : 1;
      return `VM[${vmIdx}] PROCESS[${processIdx}]`;
    });
    morgan.token('date', () => {
      return `${moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ')}`;
    })
    morgan.format('logformat', '[:date] [info] :vmProcessIdx [:method :url](:status) elapsed time=[:response-time ms]');
    this.app.use(morgan('logformat', {
      skip: function(req, res) {
        return res.statusCode < 400
      },
      stream: process.stderr
    }));
    this.app.use(morgan('logformat', {
      skip: function(req, res) {
        return res.statusCode >= 400
      },
      stream: process.stdout
    }));
  }

  registerRoutesToApp(config, app, routers) {
    routers.forEach((route) => {
      const router = Reflect.construct(route, [config]);
      router.register(app)
    });
  }

  registerErrorHandler(config, app) {
    // error handler
    app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      const msg = `Fail to call [${req.method} ${req.originalUrl}] with body: ${JSON.stringify(req.body)}`;
      console.log(`${msg}, error: ${err.message}`);
      const errRes = {
        'errMsg': msg,
        'detail': err.message
      };

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errRes));
      res.status(500).json(errRes);
    });
  }

  registerServerErrorHandler(config, server) {
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  }

  registerServerListeningHandler(config, server) {
    const _this = this;
    server.on('listening', () => {
      var addr = server.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      debug(`Listening on ${bind}`);
    })
  }


}

module.exports = AppServer;

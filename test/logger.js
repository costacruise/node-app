/* jslint node: true */
'use strict';

var assert = require('assert'),
  sinon = require('sinon'),
  winston = require('winston'),
  logger,
  nodeEnv;

describe('Logger', function () {

  beforeEach(function () {
    nodeEnv = process.env.NODE_ENV;
    sinon.stub(winston, 'debug');
    sinon.stub(winston, 'error');
    delete require.cache[require.resolve('../lib/logger.js')];
    logger = require('../lib/logger');
  });

  afterEach(function () {
    process.env.NODE_ENV = nodeEnv;
    winston.debug.restore();
    winston.error.restore();
  });

  describe('#debug()', function () {

    it('should should invoke winston', function () {
      logger.debug('foo');
      assert.equal(true, winston.debug.calledOnce);
    });

  });

  describe('#error()', function () {

    it('should should invoke winston', function () {
      logger.error('foo');
      assert.equal(true, winston.error.calledOnce);
    });

    it('should log to a given file in prod mode', function () {
      process.env.NODE_ENV = 'production';
      process.env.logFileName = 'production.log';
      delete require.cache[require.resolve('../lib/config.js')];
      delete require.cache[require.resolve('../lib/logger.js')];
      logger = require('../lib/logger');
      logger.error('foo');
      assert.equal(true, winston.error.calledOnce);
    });

  });

});

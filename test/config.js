/* jslint node: true */
'use strict';

var assert = require('assert'),
  config = require('../lib/config'),
  nodeEnv;

describe('Config', function () {

  beforeEach(function() {
    nodeEnv = process.env.NODE_ENV;
  });

  afterEach(function() {
    process.env.NODE_ENV = nodeEnv;
  });

  describe('#get()', function () {

    it('should fetch the value for an existing key', function () {
      assert.equal('bar', config.get('foo'));
    });

    it('should fetch blank for a non existing key', function () {
      assert.equal(undefined, config.get('foobar'));
    });

    it('should fallback to default config', function () {
      assert.equal(1024, config.get('http:maxSockets'));
    });

    it('should fallback development environment when no NODE_ENV', function () {
      process.env.NODE_ENV = '';
      config.reload();

      assert.equal('foobar', config.get('foo'));
    });
  });

});


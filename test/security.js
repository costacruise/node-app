/* jslint node: true */
'use strict';

var assert = require('assert'),
  jwt = require('jsonwebtoken'),
  security = require('../lib/security');

describe('Security', function () {

  beforeEach(function() {
  });

  afterEach(function() {
  });

  describe('#generateToken()', function () {

    it('should generate a valid token', function () {
      var token = security.generateToken('test','1.1.1.1');
      assert.equal(3, token.split('.').length);
      var decoded = jwt.decode(token);
      assert.equal('test', decoded.username);
      assert.equal('1.1.1.1', decoded.ipAddress);
    });
  });

  describe('#isValidToken()', function () {

    it('should identify a valid token', function () {
      var token = jwt.sign({ username: 'test', ipAddress: '1.1.1.1' }, 'some-secret', { expiresInSeconds: 1800 });
      assert.equal(true, security.isValidToken(token, 'test', '1.1.1.1'));
    });

    it('should identify an invalid token', function () {
      var token = jwt.sign({ username: 'test', ipAddress: '1.1.1.1' }, 'some-secret', { expiresInSeconds: 1800 });
      assert.equal(false, security.isValidToken(token, 'test123', '1.1.1.1'));
      assert.equal(false, security.isValidToken(token, 'test', '12.1.1.1'));
    });

    it('should reject an expired token', function (done) {
      var token = jwt.sign({ username: 'test', ipAddress: '1.1.1.1' }, 'some-secret', { expiresInSeconds: 1 });
      setTimeout(function() {
        assert.equal(false, security.isValidToken(token, 'test', '1.1.1.1'));
        done();
      }, 1100);
    });
  });
});


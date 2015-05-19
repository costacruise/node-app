// /* jslint node: true */
// 'use strict';

// var assert = require('assert'),
//   sinon = require('sinon'),
//   winston = sinon.mock(require('winston')),
//   logger = require('../lib/logger'),
//   nodeEnv;

// describe('Logger', function () {

//   beforeEach(function () {
//     nodeEnv = process.env.NODE_ENV;
//   });

//   afterEach(function () {
//     process.env.NODE_ENV = nodeEnv;
//     winston.verify();
//     winston.restore();
//   });

//   describe('#debug()', function () {

//     it('should should invoke winston', function () {
//       winston.expects('info');
//       logger.info('foo');
//       // assert.equal(true, winston.info.calledOnce);
//     });

//   });

// });

/* jslint node: true */
'use strict';

var winston = require('winston'),
  environment = process.env.NODE_ENV || 'development',
  config = require('./config'),
  filename = config.get('logFileName');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  prettyPrint: true,
  level: 'info'
});

if (environment !== 'development' && environment !== 'test') {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.File, {
    filename: filename,
    level: 'info'
  });
}

module.exports = {
  debug: winston.debug,
  info: winston.info,
  error: winston.error
};


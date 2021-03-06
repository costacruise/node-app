/* jslint node: true */
'use strict';

var winston = require('winston'),
  environment = process.env.NODE_ENV || 'development',
  config = require('./config'),
  filename = config.get('logFileName') || 'application.log',
  logLevel = config.get('logLevel') || 'info';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  prettyPrint: true,
  level: logLevel,
  json: false,
  timestamp: true
});

if (environment !== 'development' && environment !== 'test') {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.File, {
    filename: filename,
    level: logLevel,
    json: false,
    timestamp: true
  });
}

module.exports = {
  debug: winston.debug,
  info: winston.info,
  error: winston.error
};


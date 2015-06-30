/* jslint node: true */
'use strict';

var current;

/**
 * Hierarchical configuration of the app using the flatiron/nconf module that
 * cascades from command line arguments, environmental variables, config file settings,
 * to default values.
 */
function read() {
  var nconf = require('nconf'),
    path = require('path'),
    environment = process.env.NODE_ENV || 'development',
    yaml = require('nconf-yaml'),
    configDir = path.dirname(require.main.filename) + '/config';
  
  nconf.clear();
  nconf.reset();

  // priority #1 - overridden key/value pairs that will always be used
  nconf.overrides({
    environment: environment
  });

  // priority #2 - read from command line arguments using the optimist module
  nconf.argv();

  // priority #3 - read from environmental variables
  /* 
   * sub keys like 
   * database: 
   *    host: 
   *       localhost
   *
   * translate to database_host 
   */
  nconf.env({
    separator: '_'
  });

  // priority #4 - hard-coded values loaded from $NODE_ENV.yml
  nconf.add('environment', {
    type: 'file',
    file: configDir + '/' + environment + '.yml',
    format: yaml
  });

  // force the two files to apply in order; https://github.com/flatiron/nconf/issues/15
  nconf.load();

  // priority #5 - hard-coded default values loaded from defaults.yml
  nconf.file({
    file: configDir + '/defaults.yml',
    format: yaml
  });

  // expose a `reload()` method to reinitialize the config
  // this is needed to be able to force a reload of the config for unit testing
  nconf.reload = read;

  return nconf;
}

// expose the module both as a working config with just `var config = require('./lib/config')`
current = read();
module.exports = current;

# node-app
Module that provides basic utilities like config and logging for Node JS projects


## Configuration

Provides a config support for node applications using [nconf](https://github.com/indexzero/nconf). To use the module:

```
var node_app = require('node-app'),
    config = node_app.config;

// get config value for the key 'foo'
config.get('foo');

// get config value for the key 'bar' under 'foo'
config.get('foo:bar');
```

Config files need to be put in `config` directory on the root of the project. The file format is YAML. e.g.

```
foo:
  bar
http:
  maxSockets:
    1024
```

## Logging

Provides a wrapper around [winston](https://github.com/winstonjs/winston). To use the module:

```
var node_app = require('node-app'),
    logger = node_app.logger;

// DUMMY var for illustration - not needed in real implementations
var bar = { a: 1 };

// DEBUG log
logger.debug('foo', bar);

// INFO log
logger.info('foo', bar);

// ERROR log
logger.error('foo', bar);

```

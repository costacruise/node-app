/* jslint node: true */
'use strict';

var jwt = require('jsonwebtoken'),
  logger = require('./logger'),
  config = require('./config');

var secret = config.get('security:jwt:secret') || 'th1s-I5-a-secRet';

/**
 * Generate a signed JWT token (http://jwt.io) based on user name and ip address.
 * The token has a time expiry as defined in config (defaults to 30 mins), and 
 * is signed using a secret key.
 *
 * @param {string} username
 * @param {string} ipAddress
 *
 * @returns {string} JWT token
 */
function generateToken(username, ipAddress) {
  return jwt.sign({
    username: username,
    ipAddress: ipAddress
  }, secret, {
    expiresInSeconds: config.get('security:jwt:expiry') || 1800
  });
}

/**
 * Validates if the given strings have the same value.
 *
 * @param {string} string1
 * @param {string} string2
 *
 * @returns {boolean} true if the strings are equal
 */
function isSameString(string1, string2) {
  return !!string1 && !!string2 && string1.toLowerCase() === string2.toLowerCase();
}

/**
 * Validates if the token is still valid (or expired), and belongs to the
 * given user and ip address.
 *
 * @param {string} token
 * @param {string} username
 * @param {string} ipAddress
 *
 * @returns {boolean} true if token is valid
 */
function isValidToken(token, username, ipAddress) {
  console.log('disregarding IP address for comparison', ipAddress);
  var decoded = {};
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    // expired/ invalid
    console.log(err.stack);
  }
  return decoded && isSameString(decoded.username, username); // && decoded.ipAddress === ipAddress;
}

module.exports = {
  generateToken: generateToken,
  isValidToken: isValidToken
};

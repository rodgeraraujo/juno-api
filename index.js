'use strict';

var pkg = require('./package.json');
const defaults = require('lodash/defaults');
const got = require('got');
const EventEmitter = require('events');
var resources = require('./resources');

/**
 * Creates a Juno instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.secretId The juno client id
 * @param {String} options.clientSecret The juno client isecret
 * @param {String} options.accessToken The persistent OAuth for client
 * @param {String} options.resourceToken The resource token
 * @param {String} options.baseUrl The base url of Juno API
 * @param {String} options.resourceOptions The options for request
 * @constructor
 * @public
 */
function Juno(options) {
  if (!(this instanceof Juno)) return new Juno(options);
  if (
    !options ||
    !options.baseUrl ||
    (!options.baseUrl && (!options.resourceToken || !options.accessToken)) ||
    (!options.baseUrl && (!options.secretId || !options.clientSecret))
  ) {
    throw new Error('Missing or invalid options');
  }

  EventEmitter.call(this);
  this.options = defaults(options, {});

  this.baseUrl = {
    hostname: options.baseUrl,
    protocol: 'https:',
  };
}

Object.setPrototypeOf(Juno.prototype, EventEmitter.prototype);

/**
 * Sends a request to a Juno API endpoint.
 *
 * @param {Object} uri URL object
 * @param {String} method HTTP method
 * @param {(String|undefined)} key Key name to use for req/res body
 * @param {(Object|undefined)} data Request body
 * @param {(Object|undefined)} headers Extra headers
 * @return {Promise}
 * @private
 */
Juno.prototype.request = function request(uri, method, key, data, headers) {
  const options = {
    headers: { 'User-Agent': `${pkg.name}/${pkg.version}`, ...headers },
    responseType: 'json',
    retry: 0,
    method,
  };

  if (this.options.accessToken) {
    options.headers['Authorization'] = 'Bearer ' + this.options.accessToken;
  }

  if (this.options.resourceToken) {
    options.headers['X-Resource-Token'] = this.options.resourceToken;
  }

  options.headers['X-Api-Version'] = !this.options.apiVersion ? 2 : this.options.apiVersion;

  if (data) {
    options.json = key ? { [key]: data } : data;
  }

  console.log(uri);
  return got(uri, options).then(
    (res) => {
      const body = res.body;

      if (res.statusCode === 202) {
        const { path, search } = url.parse(res.headers['location']);
        return delay(retryAfter).then(() => {
          const uri = { path, ...this.baseUrl };

          if (search) uri.search = search;

          return this.request(uri, 'GET', key);
        });
      }

      const data = key ? body[key] : body || {};

      return data;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

Juno.prototype.getAccessToken = function getAccessToken(uri, method, headers) {
  const options = {
    headers: { 'User-Agent': `${pkg.name}/${pkg.version}`, ...headers },
    responseType: 'json',
    retry: 0,
    method,
  };

  var hashBase64 = getClientHash(this.options.secretId, this.options.clientSecret);

  options.headers['Authorization'] = 'Basic ' + hashBase64;

  return got(uri, options).then(
    (res) => {
      const body = res.body;
      return body;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

resources.registerAll(Juno);

/**
 * Returns a promise that resolves after a given amount of time.
 *
 * @param {Number} ms Amount of milliseconds to wait
 * @return {Promise} Promise that resolves after `ms` milliseconds
 * @private
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a hash corresponding to the client, created with base64.
 *
 * @param {String} clientId The client id, public identifier for apps
 * @param {String} clientSecret The client secret, a secret known only to the application and the authorization server
 * @return {String} A hash base64 string
 * @private
 */
function getClientHash(clientId, clientSecret) {
  let data = `${clientId}:${clientSecret}`;
  let buff = new Buffer(data);
  return buff.toString('base64');
}

module.exports = Juno;

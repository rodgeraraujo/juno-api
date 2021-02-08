'use strict';

const pkg = require('./package.json');
const defaults = require('lodash/defaults');
const got = require('got');
const EventEmitter = require('events');
const resources = require('./resources');
const url = require('url');

/**
 * Creates a Juno instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.clientId The juno client id
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
        (!options.accessToken &&
            !options.resourceToken &&
            (!options.clientId || !options.clientSecret)) ||
        (options.accessToken && options.resourceToken && (options.clientId || options.clientSecret))
    ) {
        throw new Error('Missing or invalid options');
    }

    this._options = defaults(options, { isProd: true });

    this._baseUrl = {
        hostname: this._options.isProd ? 'api.juno.com.br' : 'sandbox.boletobancario.com',
        protocol: 'https:',
    };

    this._baseHeaders = { 'User-Agent': `${pkg.name}/${pkg.version}`, Accept: 'application/json' };

    if (this._options.clientId && this._options.clientSecret) {
        const hashBase64 = getClientHash(this._options.clientId, this._options.clientSecret);
        this._baseHeaders.Authorization = 'Basic ' + hashBase64;
    } else {
        this._baseHeaders['X-Api-Version'] = !this._options.apiVersion
            ? 2
            : this._options.apiVersion;

        if (this._options.accessToken) {
            this._baseHeaders['Authorization'] = 'Bearer ' + this._options.accessToken;
        }

        if (this._options.resourceToken) {
            this._baseHeaders['X-Resource-Token'] = this._options.resourceToken;
        }
    }

    EventEmitter.call(this);
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
        headers: { ...headers, ...this._baseHeaders },
        responseType: 'json',
        retry: 0,
        method,
    };

    if (data) {
        options.json = key ? { [key]: data } : data;
    }

    return got(uri, options).then(
        (res) => {
            const body = res.body;

            if (res.statusCode === 202) {
                const retryAfter = res.headers['retry-after'] * 1000 || 0;
                const { path, search } = url.URL(res.headers['location']);
                return delay(retryAfter).then(() => {
                    const uriRetry = { path, ...this._baseUrl };

                    if (search) uriRetry.search = search;

                    return this.request(uriRetry, 'GET', key);
                });
            }

            return key ? body[key] : body || {};
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
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

module.exports = Juno;

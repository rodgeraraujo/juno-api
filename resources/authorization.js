'use strict';

const assign = require('lodash/assign');

/**
 * Creates a Authorization instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Authorization(juno) {
    this.juno = juno;

    this.name = 'oauth';
    this.key = 'token';
    this.query = 'client_credentials';
}

assign(Authorization.prototype);

/**
 * Gets the access token for client credentials.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Authorization.prototype.accessToken = function () {
    const path = buildPath(this.name, this.key, this.query);
    const url = { path, ...this.juno.baseUrl };
    return this.juno.getAccessToken(url, 'POST');
};

/**
 * Builds the request path.
 *
 * @param {String} [name] Name of request
 * @param {String} [key] Key of reqquest
 * @param {Object} [query] Query parameters
 * @return {String} PATH string
 * @private
 */
function buildPath(name, key, query) {
    query || query === 0 || (query = '');

    let path = '';

    path += `/authorization-server/${name}/${key}`;

    if (query) {
        path += `?grant_type=${query}`;
    }
    path = path.replace(/\/+/g, '/').replace(/\/$/, '');

    return path;
}

module.exports = Authorization;

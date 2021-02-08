'use strict';

const assign = require('lodash/assign');

const junoAuthorization = require('../mixins/juno-authorization');
/**
 * Creates a Authorization instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Authorization(juno) {
    this.juno = juno;

    this.name = 'token';
    this.key = '';
    this.query = { grant_type: 'client_credentials' };
}

assign(Authorization.prototype, junoAuthorization);

/**
 * Gets the access token for client credentials.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Authorization.prototype.accessToken = function () {
    const url = this.buildUrl(this.query);
    return this.juno.request(url, 'POST');
};

module.exports = Authorization;

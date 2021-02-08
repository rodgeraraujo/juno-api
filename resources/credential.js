'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Credential instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Credential(juno) {
    this.juno = juno;

    this.name = 'credentials/public-key';
    this.key = '';
    this.headers = {
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
    };
}

assign(Credential.prototype, base);

/**
 * Total or partial capture of previously authorized credit card transaction.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Credential.prototype.get = function get() {
    const url = this.buildUrl();
    return this.juno.request(url, 'GET', this.key, null, this.headers);
};

module.exports = Credential;

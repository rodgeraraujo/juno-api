'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/index');

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
}

assign(Credential.prototype, base);

module.exports = Credential;

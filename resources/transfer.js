'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Transfer instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Transfer(juno) {
    this.juno = juno;

    this.name = 'transfers';
    this.key = '';
}

assign(Transfer.prototype, base);

module.exports = Transfer;

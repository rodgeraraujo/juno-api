'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Get Banks instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Balance(juno) {
    this.juno = juno;

    this.name = 'balance';
    this.key = '';
}

assign(Balance.prototype, base);

module.exports = Balance;

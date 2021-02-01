'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/index');

/**
 * Get Banks instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Banks(juno) {
    this.juno = juno;

    this.name = 'data/banks';
    this.key = '';
}

assign(Banks.prototype, base);

module.exports = Banks;

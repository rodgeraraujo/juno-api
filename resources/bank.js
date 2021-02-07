'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Get Banks instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Banks(juno) {
    this.juno = juno;

    this.parentName = 'data';
    this.name = 'banks';
    this.key = '';
}

assign(Banks.prototype, baseChild);

module.exports = Banks;

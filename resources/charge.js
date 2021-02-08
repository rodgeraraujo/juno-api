'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates a Charge instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Charge(juno) {
    this.juno = juno;

    this.name = 'charges';
    this.key = '';
}

assign(Charge.prototype, base);

module.exports = Charge;

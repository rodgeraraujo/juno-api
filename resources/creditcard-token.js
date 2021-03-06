'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Creates a CreditCardToken instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function CreditCardToken(juno) {
    this.juno = juno;

    this.parentName = 'credit-cards';
    this.name = 'tokenization';
    this.key = '';
}

assign(CreditCardToken.prototype, baseChild);

module.exports = CreditCardToken;

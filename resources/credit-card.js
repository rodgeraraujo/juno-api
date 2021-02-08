'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Tokenize a Credit Card instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function CreditCard(juno) {
    this.juno = juno;

    this.name = 'credit-cards';
    this.key = '';
}

assign(CreditCard.prototype, base);

module.exports = CreditCard;

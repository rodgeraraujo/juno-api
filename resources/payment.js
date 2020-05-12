'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/index');

/**
 * Creates a Payment instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Payment(juno) {
  this.juno = juno;

  this.name = 'payments';
  this.key = '';
}

assign(Payment.prototype, base);

module.exports = Payment;

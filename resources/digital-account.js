'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/index');

/**
 * Create a Digital Account instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function DigitalAccount(juno) {
  this.juno = juno;

  this.name = 'digital-accounts';
  this.key = '';
}

assign(DigitalAccount.prototype, base);

module.exports = DigitalAccount;

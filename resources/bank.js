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
function CompanyTypes(juno) {
  this.juno = juno;

  this.name = 'credit-cards';
  this.key = 'tokenization';
}

assign(CompanyTypes.prototype, base);

module.exports = CompanyTypes;

'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/index');

/**
 * Get Company Types instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function CompanyTypes(juno) {
  this.juno = juno;

  this.name = 'data/company-types';
  this.key = '';
}

assign(CompanyTypes.prototype, base);

module.exports = CompanyTypes;

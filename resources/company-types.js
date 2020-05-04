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

  this.name = 'data';
  this.key = 'company-types';
}

assign(CompanyTypes.prototype, base);

module.exports = CompanyTypes;

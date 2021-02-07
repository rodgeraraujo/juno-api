'use strict';

const assign = require('lodash/assign');

const baseChild = require('../mixins/base-child');

/**
 * Get Company Types instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function CompanyTypes(juno) {
    this.juno = juno;

    this.parentName = 'data';
    this.name = 'company-types';
    this.key = '';
}

assign(CompanyTypes.prototype, baseChild);

module.exports = CompanyTypes;

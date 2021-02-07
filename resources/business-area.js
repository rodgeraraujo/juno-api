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
function BusinessArea(juno) {
    this.juno = juno;

    this.parentName = 'data';
    this.name = 'business-areas';
    this.key = '';
}

assign(BusinessArea.prototype, baseChild);

module.exports = BusinessArea;

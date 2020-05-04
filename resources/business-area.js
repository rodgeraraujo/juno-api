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
function BusinessArea(juno) {
  this.juno = juno;

  this.name = 'data';
  this.key = 'business-areas';
}

assign(BusinessArea.prototype, base);

module.exports = BusinessArea;

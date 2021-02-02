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
function Webhook(juno) {
    this.juno = juno;

    this.parentName = 'notifications';
    this.name = 'webhooks';
    this.key = '';
}

assign(Webhook.prototype, baseChild);

module.exports = Webhook;

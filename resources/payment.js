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

/**
 * Creates a total or partial refunds of credit card transaction.
 *
 * @param {Number} id Payment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Payment.prototype.refund = function refund(id) {
    const url = this.buildUrl(`${id}/refunds`);
    return this.juno.request(url, 'POST', undefined).then((body) => body);
};

/**
 * Total or partial capture of previously authorized credit card transaction.
 *
 * @param {Number} id Payment ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Payment.prototype.refund = function refund(id) {
    const url = this.buildUrl(`${id}/capture`);
    return this.juno.request(url, 'POST', undefined).then((body) => body);
};
module.exports = Payment;

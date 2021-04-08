'use strict';

const map = {
    authorization: 'authorization',
    balance: 'balance',
    bank: 'bank',
    businessArea: 'business-area',
    charge: 'charge',
    companyTypes: 'company-types',
    creditCard: 'credit-card',
    digitalAccount: 'digital-account',
    payment: 'payment',
    transfer: 'transfer',
    credential: 'credential',
    credidCardToken: 'creditcard-token',
    webhook: 'webhook',
};

/**
 * Registers resources on the `Juno` class.
 *
 * @param {Juno} Juno The `Juno` class
 * @private
 */
function registerAll(Juno) {
    Object.keys(map).forEach((prop) => {
        Object.defineProperty(Juno.prototype, prop, {
            configurable: true,
            get: function get() {
                const resource = require(`./${map[prop]}`);

                return Object.defineProperty(this, prop, {
                    value: new resource(this),
                })[prop];
            },
            set: function set(value) {
                Object.defineProperty(this, prop, { value })[prop];
            },
        });
    });
}

module.exports = {
    registerAll,
};

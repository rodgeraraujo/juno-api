'use strict';

const qs = require('querystring');

/**
 * This provides methods used by resources. It's not meant to be used directly.
 *
 * @mixin
 */
const base = {
    /**
     * Creates a new record.
     *
     * @param {Object} params Record properties
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    create(params) {
        const url = this.buildUrl();
        return this.juno.request(url, 'POST', this.key, params);
    },

    /**
     * Gets a single record by its ID.
     *
     * @param {Number} id Record ID
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    get(id, params) {
        const url = this.buildUrl(id, params);
        return this.juno.request(url, 'GET', this.key);
    },

    /**
     * Gets a list of records.
     *
     * @param {Object} params Query parameters
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    list(params) {
        const url = this.buildUrl(undefined, params);
        return this.juno.request(url, 'GET', this.key);
    },

    /**
     * Deletes a record.
     *
     * @param {Number} id Record ID
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    delete(id) {
        const url = this.buildUrl(id);
        return this.shopify.request(url, 'DELETE');
    },

    /**
     * Updates a record.
     *
     * @param {Number} id Record ID
     * @param {Object} params Record properties
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    update(id, params) {
        const url = this.buildUrl(id);
        return this.shopify.request(url, 'PUT', this.key, params);
    },

    /**
     * Builds the request URL.
     *
     * @param {Number|String} [id] Record ID
     * @param {Object} [query] Query parameters
     * @return {Object} URL object
     * @private
     */
    buildUrl(id, query) {
        id || id === 0 || (id = '');

        let path = !this.juno._options.isProd ? '/api-integration' : '';

        path += `/${this.name}/${id}`;
        path = path.replace(/\/+/g, '/').replace(/\/$/, '');

        const url = { path, ...this.juno._baseUrl };

        if (query) {
            url.search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });
        }

        return url;
    },
};

module.exports = base;

const qs = require('querystring');

const baseChild = {
    /**
     * Creates a new record.
     *
     * @param {Number} parentId Parent record ID
     * @param {Object} params Record properties
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    create(parentId, params) {
        const url = this.buildUrl(parentId);
        return this.juno.request(url, 'POST', this.key, params);
    },

    /**
     * Deletes a record.
     *
     * @param {Number} parentId Parent record ID
     * @param {Number} id Record ID
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    delete(parentId, id, params) {
        const url = this.buildUrl(parentId, id, params);
        return this.juno.request(url, 'DELETE');
    },

    /**
     * Get a single record by its ID.
     *
     * @param {Number} parentId Parent record ID
     * @param {Number} id Record ID
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    get(parentId, id, params) {
        const url = this.buildUrl(parentId, id, params);
        return this.juno.request(url, 'GET', this.key);
    },

    /**
     * Get a list of records.
     *
     * @param {Number} parentId Parent record ID
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    list(parentId, params) {
        const url = this.buildUrl(parentId, undefined, params);
        return this.juno.request(url, 'GET', this.name);
    },

    /**
     * Updates a record.
     *
     * @param {Number} parentId Parent record ID
     * @param {Number} id Record ID
     * @param {Object} params Record properties
     * @return {Promise} Promise that resolves with the result
     * @public
     */
    update(parentId, id, params) {
        const url = this.buildUrl(parentId, id);
        return this.juno.request(url, 'PUT', this.key, params);
    },

    /**
     * Builds the request URL.
     *
     * @param {Number} parentId Parent record ID
     * @param {Number|String} [id] Record ID
     * @param {Object} [query] Query parameters
     * @return {Object} URL object
     * @private
     */
    buildUrl(parentId, id, query) {
        id || id === 0 || (id = '');

        let path = '/api-integration';

        path += `/${this.parentName}/${parentId}/${this.name}/${id}`;
        path = path.replace(/\/+/g, '/').replace(/\/$/, '');

        const url = { path, ...this.juno.baseUrl };

        if (query) {
            url.search = '?' + qs.stringify(query, { arrayFormat: 'brackets' });
        }

        return url;
    },
};

module.exports = baseChild;

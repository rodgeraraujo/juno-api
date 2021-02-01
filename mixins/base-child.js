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
        return this.shopify.request(url, 'POST', this.key, params);
    },
};

module.exports = baseChild;

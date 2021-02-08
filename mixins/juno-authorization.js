const qs = require('querystring');

const junoAuthorization = {
    /**
     * Builds the request URL.
     *
     * @param {Object} [query] Query parameters
     * @return {Object} URL object
     * @private
     */
    buildUrl(query) {
        query || query === 0 || (query = '');

        let path = '/authorization-server/oauth';

        path += `/${this.name}`;
        path = path.replace(/\/+/g, '/').replace(/\/$/, '');

        const url = { path, ...this.juno._baseUrl };

        if (query) {
            url.path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });
        }

        return url;
    },
};

module.exports = junoAuthorization;

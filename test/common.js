const nock = require('nock');

const pkg = require('../package');
const Juno = require('..');

const apiHost = 'https://api.juno.com.br';

const accessToken = 'fakeAccessToken';
const resourceToken = 'fackeResourceToken';
const clientId = 'fackeClientId';
const clientSecret = 'fackeClientSecret';
const clientHash = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const juno = new Juno({ accessToken, resourceToken });
const junoAuth = new Juno({ clientId, clientSecret });

const scope = nock(apiHost, {
    reqheaders: {
        'User-Agent': `${pkg.name}/${pkg.version}`,
        Authorization: `Bearer ${accessToken}`,
        'X-Resource-Token': resourceToken,
        Accept: 'application/json',
        'X-Api-Version': 2,
    },
});

const scopeAuth = nock(apiHost, {
    reqheaders: {
        'User-Agent': `${pkg.name}/${pkg.version}`,
        Authorization: `Basic ${clientHash}`,
        Accept: 'application/json',
    },
});

module.exports = {
    accessToken,
    resourceToken,
    clientId,
    clientSecret,
    juno,
    scope,
    junoAuth,
    scopeAuth,
};

const expect = require('expect');

const fixtures = require('./fixtures/authorization');
const common = require('./common');

describe('Juno - Authorization', () => {
    const junoAuth = common.junoAuth;
    const scopeAuth = common.scopeAuth;

    afterEach(() => expect(scopeAuth.isDone()).toBe(true));

    it('get authorization access token (1/1)', () => {
        const output = fixtures.res.accessToken;

        scopeAuth
            .post('/authorization-server/oauth/token')
            .query({ grant_type: 'client_credentials' })
            .reply(200, output);

        return junoAuth.authorization.accessToken().then((data) => expect(data).toEqual(output));
    });
});

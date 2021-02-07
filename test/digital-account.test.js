const expect = require('expect');

const fixtures = require('./fixtures/digital-account');
const common = require('./common');

describe('Juno - Digital Account', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('get the digital account details (1/2)', async () => {
        const output = fixtures.res.get;

        scope.get('/digital-accounts').reply(200, output);

        return juno.digitalAccount.get().then((data) => expect(data).toEqual(output));
    });

    it('create digital account (2/2)', async () => {
        const input = fixtures.req.create;
        const output = fixtures.res.create;

        scope.post('/digital-accounts', input).reply(200, output);

        return juno.digitalAccount.create(input).then((data) => expect(data).toEqual(output));
    });
});

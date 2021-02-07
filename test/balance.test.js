const expect = require('expect');

const fixtures = require('./fixtures/balance');
const common = require('./common');

describe('Juno - Balance', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('get the account balance (1/1)', () => {
        const output = fixtures.res.get;

        scope.get('/balance').reply(200, output);

        return juno.balance.get().then((data) => expect(data).toEqual(output));
    });
});

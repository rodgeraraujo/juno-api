const expect = require('expect');

const fixtures = require('./fixtures/bank');
const common = require('./common');

describe('Juno - Bank', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('get a list of banks (1/1)', () => {
        const output = fixtures.res.list;

        scope.get('/data/banks').reply(200, output);

        return juno.bank.list().then((data) => expect(data).toEqual(output));
    });
});

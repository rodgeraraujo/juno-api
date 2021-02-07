const expect = require('expect');

const fixtures = require('./fixtures/charge');
const common = require('./common');

describe('Juno - Charge', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('create a charge (1/1)', () => {
        const input = fixtures.req.create;
        const output = fixtures.res.create;

        scope.post('/charges', input).reply(200, output);

        return juno.charge.create(input).then((data) => expect(data).toEqual(output));
    });
});

const expect = require('expect');

const fixtures = require('./fixtures/company-types');
const common = require('./common');

describe('Juno - Company Types', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('get a list of all company types (1/1)', () => {
        const output = fixtures.res.list;

        scope.get('/data/company-types').reply(200, output);

        return juno.companyTypes.list().then((data) => expect(data).toEqual(output));
    });
});

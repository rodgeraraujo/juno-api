const expect = require('expect');

const fixtures = require('./fixtures/business-area');
const common = require('./common');

describe('Juno - Business Area', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('get a list of all business area (1/1)', () => {
        const output = fixtures.res.list;

        scope.get('/data/business-areas').reply(200, output);

        return juno.businessArea.list().then((data) => expect(data).toEqual(output));
    });
});

const expect = require('expect');

const fixtures = require('./fixtures/webhook');
const common = require('./common');

describe('Juno - Payment', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('create a webhook (1/4)', () => {
        const input = fixtures.req.create;
        const output = fixtures.res.create;

        scope.post('/notifications/webhooks', input).reply(200, output);

        return juno.webhook.create(input).then((data) => expect(data).toEqual(output));
    });

    it('deletes an webhook (2/4)', () => {
        const id = 'wbh_413FC8';

        scope.delete(`/notifications/webhooks/${id}`).reply(200);

        return juno.webhook.delete(id).then((data) => expect(data).toEqual({}));
    });

    it('get a list of all webhooks of a certain digital account (3/4)', () => {
        const output = fixtures.res.list;

        scope.get('/notifications/webhooks').reply(200, output);

        return juno.webhook.list().then((data) => {
            expect(data).toEqual(output);
        });
    });

    it('updates an webhook (4/4)', () => {
        const input = fixtures.req.update;
        const output = fixtures.res.update;
        const id = 'wbh_413FC8';

        scope.put(`/notifications/webhooks/${id}`, input).reply(200, output);

        return juno.webhook.update(id, input).then((data) => expect(data).toEqual(output));
    });
});

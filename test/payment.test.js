const expect = require('expect');

const fixtures = require('./fixtures/payment');
const common = require('./common');

describe('Juno - Payment', () => {
    const juno = common.juno;
    const scope = common.scope;

    afterEach(() => expect(scope.isDone()).toBe(true));

    it('create a payment (1/3)', () => {
        const input = fixtures.req.create;
        const output = fixtures.res.create;

        scope.post('/payments', input).reply(200, output);

        return juno.payment.create(input).then((data) => expect(data).toEqual(output));
    });

    it('refund a payment (2/3)', () => {
        const input = fixtures.req.refund;
        const output = fixtures.res.refund;
        const id = 'pay_1266B';

        scope.post(`/payments/${id}/refunds`, input).reply(200, output);

        return juno.payment.refund(id, input).then((data) => expect(data).toEqual(output));
    });

    it('capture a payment (3/3)', () => {
        const input = fixtures.req.capture;
        const output = fixtures.res.capture;
        const id = 'pay_1266A';

        scope.post(`/payments/${id}/capture`, input).reply(200, output);

        return juno.payment.capture(id, input).then((data) => expect(data).toEqual(output));
    });
});

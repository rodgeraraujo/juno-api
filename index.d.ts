// Type definitions for juno-api 1.0.0

export = Juno;

declare class Juno {
    constructor(options: Juno.IJunoOptions);
    options: Juno.IJunoOptions;
    baseUrl: {
        hostname: string;
        protocol: string;
    };
    authorization: {
        accessToken: () => Promise<Juno.IAccessToken>;
    };
    balance: {
        get: () => Promise<Juno.IBalance>;
    };
    bank: {
        list: () => Promise<Juno.IResponseListing<Juno.IBanks>>;
    };
    businessArea: {
        list: () => Promise<IResponseListing<Juno.IBusinessArea>>;
    };
    companyTypes: {
        list: () => Promise<Juno.ICompanyTypes>;
    };
    charge: {
        create: (params: Juno.ICreateCharge) => Promise<Juno.IResponseListing<Juno.ICharge>>;
    };
    creditCard: {
        create: (params: Juno.ICreateCreditCardToken) => Promise<Juno.ITokenizedCreditCard>;
    };
    digitalAccount: {
        create: (params: Juno.ICreateDigitalAccount) => Promise<>;
        get: (params?: any) => Promise<>;
    };
    payment: {
        create: (params: Juno.ICreatePayment) => Promise<Juno.IPayment>;
        refund: (
            id: string,
            params: Juno.ICreateTransactionRefund
        ) => Promise<Juno.ITransactionRefund>;
        capture: (
            id: string,
            params: Juno.ICreateTransactionCapture
        ) => Promise<Juno.ITransactionCapture>;
    };
    credential: {
        get: () => Promise<Juno.IPublicKey>;
    };
    webhook: {
        create: (params: Juno.ICreateWebhook) => Promise<Juno.IWebhook>;
        delete: (id: number) => Promise<void>;
        list: (params?: any) => Promise<Juno.IResponseListing<Juno.IWerbhookListing>>;
        update: (id: number, params: Juno.IUpdateWebhook) => Promise<Juno.IWebhook>;
    };
}

declare namespace Juno {
    export interface IJunoOptions {
        clientId: string;
        clientSecret: string;
        accessToken: string;
        resourceToken: string;
        isProd: boolean;
        resourceOptions: string;
    }

    export interface IAccessToken {
        access_token: string;
        token_type: string;
        expires_in: number;
        scope: string;
        user_name: string;
        jti: string;
    }

    export interface IResponseError {
        timestamp: Date;
        status: number;
        error: string;
        details: [
            {
                message: string;
                errorCode: string;
            }
        ];
        path: string;
    }

    export interface IResponseLink {
        self: {
            href: string;
        };
    }

    export interface IResponseListing<T> {
        _embedded: T;
        _links: IResponseLink;
    }

    export interface IPublicKey {}
    export interface IBalance {
        balance: number;
        withheldBalance: number;
        transferableBalance: number;
        _links: IResponseLink[];
    }

    export interface IBanks {
        banks: [{ number: string; name: string }];
    }

    export interface IBusinessArea {
        businessAreas: [{ code: bigint; activity: string; category: string }];
    }

    export interface ICompanyTypes {
        companyTypes: CompanyTypes[];
        _links: IResponseLink[];
    }

    export interface ICreateCharge {
        charge: {
            pixKey?: string;
            description: string;
            references: string[];
            totalAmount: number;
            amount: number;
            dueDate: Date;
            installments: number;
            maxOverdueDays: number;
            fine: number;
            interest: string;
            discountAmount: string;
            discountDays: number;
            paymentTypes: PaymentTypes[];
            paymentAdvance: boolean;
            feeSchemaToken: string;
            split: ISplit[];
        };
        billing: {
            name: string;
            document: string;
            email: string;
            address: IBillingAddress;
            secondaryEmail: string;
            phone: string;
            birthDate: Date;
            notify: false;
        };
    }
    export interface ICharge {
        charges: [
            {
                id: string;
                code: number;
                reference: string;
                dueDate: Date;
                link: string;
                checkoutUrl: string;
                installmentLink: string;
                payNumber: string;
                amount: number;
                status: TransactionStatusTypes;
                billetDetails: {
                    bankAccount: string;
                    ourNumber: string;
                    barcodeNumber: string;
                    portfolio: string;
                };
                payments: [
                    {
                        id: string;
                        chargeId: string;
                        date: Date;
                        releaseDate: Date;
                        amount: number;
                        fee: number;
                        type: string;
                        status: TransactionStatusTypes;
                        transactionId: string;
                        failReason: string;
                    }
                ];
                pix: [
                    {
                        id: string;
                        qrcodeInBase64: string;
                        imageInBase64: string;
                    }
                ];
            }
        ];
    }

    export interface ICreateDigitalAccount {}
    export interface IDigitalAccount {}

    export interface ICreateCreditCardToken {
        creditCardHash: string;
    }

    export interface ITokenizedCreditCard {
        creditCardId: string;
        last4CardNumber: string;
        expirationMonth: string;
        expirationYear: string;
    }

    export interface ICreatePayment {
        chargeId: string;
        billing: {
            email: string;
            address: IBillingAddress;
            delayed: boolean;
        };
        creditCardDetails: {
            creditCardId?: string;
            creditCardHash?: string;
        };
    }
    export interface IPayment {
        transactionId: string;
        installments: number;
        payments: IPaymentDetail[];
        _links: IResponseLink;
    }

    export interface ICreateTransactionRefund {
        amount: number;
        split: [
            {
                recipientToken: string;
                amount: number;
                percentage: number;
                amountRemainder: boolean;
                chargeFee: boolean;
            }
        ];
    }
    export interface ITransactionRefund {
        transactionId: string;
        installments: number;
        refunds: [
            {
                id: string;
                chargeId: string;
                releaseDate: Date;
                paybackDate: Date;
                paybackAmount: number;
                status: string;
            }
        ];
        _links: IResponseLink;
    }
    export interface ICreateTransactionCapture {
        chargeId: string;
        amount: number;
    }
    export interface ITransactionCapture {
        transactionId: string;
        installments: number;
        payments: IPaymentDetail[];
    }

    interface IBillingAddress {
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        postCode: string;
    }

    interface IPaymentDetail {
        id: string;
        chargeId: string;
        date: Date;
        releaseDate: Date;
        amount: number;
        fee: number;
        type: string;
        status: string;
        transactionId: string;
        failReason: string;
    }

    interface ISlit {
        recipientToken: string;
        amount: number;
        percentage: number;
        amountRemainder: boolean;
        chargeFee: boolean;
    }

    export interface ICreateWebhook {
        url: string;
        eventTypes: WebhookEventTypes[];
    }

    export interface IWebhook {
        id: string;
        url: string;
        secret: string;
        status: string;
        eventTypes: IWebhookEventType[];
        _links: IResponseLink[];
    }

    export interface IWerbhookListing {
        webhooks: IWebhook[];
    }

    export interface IUpdateWebhook {
        url: string;
        eventTypes: WebhookEventTypes[];
    }

    export interface IWebhookEventType {
        id: string;
        name: string;
        label: string;
        status: string;
    }

    type CompanyTypes = 'MEI' | 'EI' | 'EIRELI' | 'LTDA' | 'SA' | 'INSTITUTION_NGO_ASSOCIATION';
    type PaymentTypes = 'BOLETO' | 'BOLETO_PIX' | 'CREDIT_CARD';
    type WebhookEventTypes =
        | 'DOCUMENT_STATUS_CHANGED'
        | 'DIGITAL_ACCOUNT_STATUS_CHANGED'
        | 'TRANSFER_STATUS_CHANGED'
        | 'P2P_TRANSFER_STATUS_CHANGED'
        | 'PAYMENT_NOTIFICATION'
        | 'CHARGE_STATUS_CHANGED';
    type TransactionStatusTypes =
        | 'DECLINED'
        | 'FAILED'
        | 'NOT_AUTHORIZED'
        | 'CONFIRMED'
        | 'CUSTOMER_PAID_BACK'
        | 'BANK_PAID_BACK'
        | 'PARTIALLY_REFUNDED';
}

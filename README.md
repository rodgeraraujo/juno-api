# Juno API Node.js

[![npm version](https://img.shields.io/npm/v/juno-api?logo=npm&style=flat-square)](https://badge.fury.io/js/juno-api) [![npm downloads](https://img.shields.io/npm/dm/juno-api?logo=npm&style=flat-square)](https://www.npmjs.com/package/juno-api) [![Node.js CI](https://img.shields.io/github/workflow/status/rodgeraraujo/juno-api/CI?logo=github&style=flat-square)](https://github.com/rodgeraraujo/juno-api/actions) [![codecov.io](https://img.shields.io/codecov/c/github/rodgeraraujo/juno-api?style=flat-square&branch=master&logo=codecov)](https://codecov.io/github/rodgeraraujo/juno-api?branch=master) [![Contributors](https://img.shields.io/github/contributors/rodgeraraujo/juno-api.svg?logo=&style=flat-square)](https://github.com/rodgeraraujo/juno-api/graphs/contributors) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Bindings for [Juno](https://juno.com.br/) payments API.

## Installation:

```shell
$ npm install --save juno-api
```

## API

Creates a new `Juno` instance.

Exports a constructor function which takes an `options` object, to creates a `Juno` instance.

### Arguments

options - Required - A plain JavaScript object containing configuration options.

#### Options

-   `isProd` - Optional - A boolean that specifies the api environment, default value is `true` (for use in sandbox set as `false`).
-   `accessToken` - Required for make requests - A string representing the permanent OAuth 2.0 access token. This option is mutually exclusive with the `resourceToken`.
-   `resourceToken` - Required for make requests - A string that represents the permanent identifier of a digital account, which can be used when performing an operation. This option is mutually exclusive with the `accessToken`.
-   `clientId` - Required for get access token - The client id, public identifier for apps at Juno API. This option is mutually exclusive with the `clientSecret`.
-   `clientSecret` - Required for get access token - The client secret, a secret known only to the application and the authorization server. This option is mutually exclusive with the `clientId`.

### Return

A Shopify instance.

### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example usage

This simples example, returns a object of a access token, to make requests to the Juno API.

```js
const Juno = require('juno-api');

const juno = new Juno({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

const token = await juno.authorization.accessToken();

console.log(token);

// console log message
{
  "access_token": "string-representing-access-token",
  "token_type": "token-type",
  "expires_in": 0,
  "scope": "your-scopes",
  "user_name": "you-email",
  "jti": "jti-code"
}

const juno = new Juno({
  accessToken: token.access_token, // referring to the previous example
  resourceToken: 'your-resource-token',
});

const banks = await juno.banks.list(); // retrieves a list of banks
```

## Resources

Every resource is accessed through the juno instance:

```js
const juno = new Juno({
    accessToken: 'your-access-token',
    resourceToken: 'your-resource-token',
});

// juno.<resource>.<method>
```

Each method returns a Promise that resolves with the result:

```js
juno.businessArea
    .get()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
```

## Available resources and and methods

-   authorization
    -   `getAccessToken()`
-   balance
    -   `get()`
-   bank
    -   `list()`
-   businessArea
    -   `list()`
-   companyTypes
    -   `list()`
-   charge
    -   `create(params)`
-   digitalAccount
    -   `create(params)`
    -   `get(params)`
-   payment
    -   `create(params)`
    -   `refund(id, params)`
    -   `capture(id, params)`
-   creditCard
    -   `create(params)`
-   credential
    -   `get()`
-   webhook
    -   `create(params)`
    -   `delete(id)`
    -   `list(params)`
    -   `update(id, params)`

> Obs: `params` is a plain JavaScript object, see Juno docs for params details.

## License

[MIT](https://github.com/rodgeraraujo/juno-api/blob/master/LICENSE)

## Author

[Rogério Araújo](https://github.com/rodgeraraujo)

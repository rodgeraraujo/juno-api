# Juno API Node.js

Bindings for [Juno](https://juno.com.br/) API

## Installation:

```shell
$ npm install --save juno-api-node
```

## API

Creates a new `Juno` instance.

Exports a constructor function which takes an `options` object, to creates a `Juno` instance.

### Arguments

options - Required - A plain JavaScript object containing configuration options.

#### Options

- `baseUrl` - Required - A string that specifies the api base URI (for use in sandbox or production.
- `accessToken` - Required for make requests - A string representing the permanent
  OAuth 2.0 access token. This option is mutually exclusive with the `baseUrl` and `resourceToken`.
- `resourceToken` - Required for make requests - A string that represents the permanent identifier of a digital account, which can be used when performing an operation. This option is mutually exclusive with the `baseUrl` and `accessToken`.
  OAuth 2.0 access token. This option is mutually exclusive with the `baseUrl` and `resourceToken`.
- `secretId` - Required for get access token - The client id, public identifier for apps at Juno API. This option is mutually exclusive with the `baseUrl` and `clientSecret`.
- `clientSecret` - Required for get access token - The client secret, a secret known only to the application and the authorization server. This option is mutually exclusive with the `baseUrl` and `secretId`.

#### Example usage

This simples example, returns a object of a access token, to make requests to the Juno API.

```js
var Juno = require('juno-api-node');

const juno = new Juno({
  baseUrl: 'juno-base-url',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

var token = await juno.authorization.accessToken();

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
```

```js
var Juno = require('juno-api-node');

const juno = new Juno({
  baseUrl: 'juno-base-url',
  accessToken: token.access_token, // referring to the previous example
  resourceToken: 'your-resource-token',
});

var banks = await juno.banks.get(); // retrieves a list of banks
```

## License

[MIT](LICENSE)

## Author

[Rogério Araújo](https://github.com/rodgeraraujo)

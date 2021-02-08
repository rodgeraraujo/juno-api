# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2021-02-07

### Added

-   Use CI on GitHub Actions.
-   Adds github workflow for automate deploying to NPM.

### Changed

-   Fixed mixins invalid `isProd` parameter definition.

## [0.2.0] - 2021-02-07

### Added

-   This CHANGELOG file to hopefully serve as an evolving example of a standardized open source project CHANGELOG.
-   Lint using Prettier style with Eslint, and added Commitlint.
-   CreditCard resource.
-   Refund and Capture methods to Payment resource.
-   Webhook resource.
-   Use `.list` instead `.get` for Bank, businessArea and companyTypes resourcess.
-   Tests.
-   Tests coverage output with c8.
-   TypeScript definitions.

### Changed

-   Update options object, added a suport to use in production with params `isProd`.
-   Removed param `baseUrl` from options..
-   Refactoring client hash base64.
-   Refactoring headers.
-   Fixed URI hostname.
-   Change `secretId` param into `clientId`.
-   Fixed Payment resource (Refund and Capture methods).

## [0.1.2] - 2020-05-12

### Changed

-   Fixed request wrong import names.
-   Update README docs.
-   Update lib name from `juno-api-node` to `juno-api`.
-   Fixed name type for payments resource.

## [0.1.1] - 2020-05-08

### Changed

-   Fixed request wrong import names.

## [0.1.0] - 2020-05-04

### Added

-   First release.

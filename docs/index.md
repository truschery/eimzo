# Documentation | @truschery/eimzo

Welcome to the official documentation for the `@truschery/eimzo` SDK. This package provides the best Developer Experience for interacting with the [E-IMZO](https://e-imzo.soliq.uz) application.

## Contents
- [Installation](#installation)
- [Configuration (EimzoOptions)](#configuration)
- [Modules Overview](#modules-overview)

## Installation

Install the package using your favorite package manager:

```bash
npm install @truschery/eimzo
# or
yarn add @truschery/eimzo
# or
pnpm add @truschery/eimzo
```

## Configuration
To use the SDK, you must import the Eimzo class and initialize it with your configuration object.
```typescript
import { Eimzo, EimzoOptions } from '@truschery/eimzo';

const options: EimzoOptions = {
  // OPTIONAL
  apiKeys: {
    // INFO: Localhost is the default
    'example.com': 'my_token...'
  },
  
  // OPTIONAL
  getTimestamp: async (signatureHash) => {
    // Custom logic to fetch timestamp from your backend
    return 'timestamp_base64_string';
  }
};

const eimzo = new Eimzo(options);
```

## Modules Overview
The SDK is divided into logical modules. Choose a section to read more:
- **[Eimzo Client (Core)](./client.md)** — Main entry point, Health Checks, and Agent version. It seamlessly uses 
the `@truschery/eimzo-api` package under the hood as the transport client.
- **[PFX Module](./pfx.md)** — Listing and smart filtering of certificates.
- **[Certificate Class](./certificate.md)** — Certificate details and signing methods.
- **[PKCS7 Module](./pkcs7.md)** — Parsing and reading signature information.



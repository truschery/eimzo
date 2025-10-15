# Documentation @truschery/eimzo

A simple package for integration with the Eimzo API, providing the best experience for interacting with certificates, Pkcs7, and other plugins [Eimzo](https://e-imzo.soliq.uz)


## Contents
- [Installation](#installation)
- [API](#api)
- [Interfaces](#interfaces)

## Installation

Install the package via npm:
```js
npm install @truschery/eimzo
```

To use `@truschery/eimzo`, import the package and initialize it with your Eimzo API credentials.
```
import Eimzo from '@truschery/eimzo'

// Initialize with API key
const eimzo = new Eimzo({
  // ...configuration...
})

// You need to add API keys
eimzo.addApiKey('your-site', 'api-key')
```
Now you can use this object for interaction.

## API

### Eimzo
#### Properties 
> eimzo.certificates: PfxCertificate[]
#### Add API keys
> eimzo.addApiKey(domain: string, key: string): void
#### Load the list of PFX certificates
> eimzo.loadPfxCertificates(): Promise<PfxCertificate[]>

### More about [PfxCertificate](./pfxCertificate.md)


## Interfaces
### IEimzo
The `IEimzo` interface defines a contract for interacting with the Eimzo system, combining functionality for managing API keys and loading PFX certificates. It extends the `HasApiKeys` and `HasPfxPlugin` interfaces and includes error codes defined in the `EimzoErrorCodes` enum.

You can find out more here [IEimzo](./interfaces/IEimzo.md)

### PfxCertificate
The Certificate namespace defines interfaces for working with certificates, including their details and operational methods. It includes the Instance interface, which extends the Details interface, and provides methods for certificate operations such as signing and key loading.

You can find out more here [Certificate](./interfaces/Certificate.md)

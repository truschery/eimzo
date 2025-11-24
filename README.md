# Eimzo

<div align="center">
  <h1>Eimzo</h1>
  <a href="https://www.npmjs.org/package/@truschery/eimzo"><img src="https://img.shields.io/npm/v/@truschery/eimzo?style=flat-square" /></a>
  <a href="https://packagephobia.com/result?p=@truschery/eimzo"><img src="https://packagephobia.com/badge?p=@truschery/eimzo" /></a>
  <a href="https://bundlephobia.com/package/@truschery/eimzo@latest"><img src="https://img.shields.io/bundlephobia/minzip/@truschery/eimzo?style=flat-square" /></a>
  <a href="https://npm-stat.com/charts.html?package=@truschery/eimzo"><img src="https://img.shields.io/npm/dm/@truschery/eimzo?style=flat-square" /></a>
  <br />
  <br />
  <a href="#features">Features</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#installation">Installation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#documentation">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#example">Example</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#license">License</a>
  <br />
  <hr />
</div>

A simple package for integration with the Eimzo API, providing the best experience for interacting with certificates, Pkcs7, and other plugins [Eimzo](https://e-imzo.soliq.uz)


## Features
The package has the ability to:
- Sending and processing API requests to Eimzo
- Connecting Eimzo API keys and checking the Eimzo application version
- Interaction with certificates implemented
- Throwing exceptions for convenient error handling 

Plans:
- Implement unit testing of modules
- Implement a simple package configuration  
- Add functionality for interacting with other Eimzo plugins

## Installation
Install the package via npm:

```bash
npm install @truschery/eimzo
```

## Documentation
To view the complete documentation for the package, you can visit [Docs](docs/index.md)

Ensure you have Node.js version 14 or higher installed.

## Example
To use `@truschery/eimzo`, import the package and initialize it with your Eimzo API credentials.

```javascript
import Eimzo from '@truschery/eimzo'

// Initialize with API key
const eimzo = new Eimzo({
  // ...configuration...
})

// You need to add API keys
eimzo.addApiKey('your-site', 'api-key')

// Get a list of certificates
const certificates = await eimzo.loadPfxCertificates()

// Interaction with the certificate
const certificate = certificates[0]

// Signing a string with a certificate
certificate.sign('string to sign', {
 // options
 detached: boolean  
}): string

// Is the certificate expired?
certificate.isExpired(): bool
// Does this certificate belong to an individual?
certificate.isPhysical(): bool
```

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
# Eimzo

<div align="center">
  <h1>E-IMZO SDK</h1>
  <p><b>Modern, Promise-based, and strictly typed SDK for E-IMZO</b></p>
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

`@truschery/eimzo` is a lightweight wrapper that provides the best Developer Experience for interacting with E-IMZO certificates, PKCS#7 signatures, and smart filtering

## Features
- **Modern API:** Fully Promise-based (`async/await`). No more nested callbacks
- **First-class TypeScript:** Excellent IDE autocompletion for certificate properties and methods
- **Smart Filtering:** Find certificates by INN, PINFL, or validity status out of the box
- **Clean Architecture:** Immutable configuration and separated transport layer (`eimzo-api`)

## Plans:
- **Tests**: Implement unit testing of modules
- **Config**: Implement a simple package configuration  
- **Plugins**: Add functionality for interacting with other Eimzo plugins

## Installation
Install the package via npm:

```bash
npm install @truschery/eimzo
# or
yarn add @truschery/eimzo
# or
pnpm add @truschery/eimzo
```

## Documentation
To view the complete documentation for the package, you can visit [Docs](docs/index.md)

Ensure you have Node.js version 14 or higher installed.

## Quick Start
To use `@truschery/eimzo`, Initialize the facade once and enjoy the magic:

```typescript
import Eimzo from '@truschery/eimzo'

// Initialize with API key
const eimzo = new Eimzo({
  keys: {
      'example.com': 'my-token...'
  }
})

// Get a list of certificates
const certificates = await eimzo.pfx.list({
    /** filter options */
})

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
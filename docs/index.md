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
#### Свойства 
> eimzo.certificates: PfxCertificate[]
#### Добавить API ключи
> eimzo.addApiKey(domain: string, key: string): void
#### Загрузить список PFX сертификатов
> eimzo.loadPfxCertificates(): Promise<PfxCertificate[]>

### Подробнее о [PfxCertificate](./pfxCertificate.md)


# Eimzo

A lightweight Node.js package for seamless integration with Eimzo, providing easy-to-use functionality for creating digital signatures and managing API keys.

Легковесный пакет для Node.js, обеспечивающий простую интеграцию с Eimzo для создания электронных подписей и управления API-ключами.

Eimzo bilan soddalashtirilgan integratsiya uchun yengil Node.js paketi, raqamli imzolarni yaratish va API kalitlarini boshqarish imkoniyatini beradi.

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features
- The ability to use the pkcs7 plugin
- The ability to use the pfx plugin

## Installation
Install the package via npm:

```bash
npm install @truschery/eimzo
```

Ensure you have Node.js version 14 or higher installed.

## Usage
To use `@truschery/eimzo`, import the package and initialize it with your Eimzo API credentials.

```javascript
import EService from '@truschery/eimzo'

// Initialize with API key
const eimzoService = new EService([
  'localhost',
  'api-key',
])

// You need to install API keys
await eimzoService.install()

// Create a digital signature

await eimzoService.sign('key id', 'string to signature')
```

## API Reference
- `EService(apiKeys)`: Initialize the Eimzo service with configuration.
  - `apiKeys`: Your Eimzo API key (required).
- `sign(keyId, data)`: Creates a digital signature for the provided data.
  - Returns: `Promise<string>` - The generated signature.
- `install()`: Install API keys.
  - Returns: `Promise<void>`.

For detailed documentation, see [API Documentation](./docs/api.md).

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support
If you encounter any issues or have questions, please file an issue on the [GitHub Issues page](https://github.com/truschery/eimzo/issues).
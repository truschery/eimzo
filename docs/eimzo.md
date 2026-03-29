# Eimzo Facade

The `Eimzo` class is the main entry point of the SDK. It acts as a **Facade**, orchestrating configuration, modules, and the underlying WebSocket connection.

Under the hood, it seamlessly uses the lightweight `@truschery/eimzo-api` package as the transport client to communicate with the local E-IMZO desktop application.

## Properties
Once initialized, the Eimzo instance provides access to specific business-logic modules:
- [eimzo.pfx](./pfx.md) — Access the PFX Module for listing and filtering certificates.
- [eimzo.pkcs7](./pkcs7.md) — Access the PKCS7 Module for parsing signature information.

## Methods
### `getVersion()`
Fetches the version of the currently installed E-IMZO Desktop Application. 
This is extremely useful for debugging or enforcing minimum version requirements.

Returns: `Promise<EimzoVersion>`

```ts
const version = await eimzo.getVersion();

console.log(version.major); // e.g., 4
console.log(version.minor); // e.g., 28
console.log(version.full);  // "4.28"

if (version.major < 4) {
  console.warn("Please update your E-IMZO application to version 4.x or higher.");
}
```


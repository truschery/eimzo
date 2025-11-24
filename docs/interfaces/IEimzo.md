# IEimzo Interface Documentation

The `IEimzo` interface defines a contract for interacting with the Eimzo system, combining functionality for managing API keys and loading PFX certificates. It extends the `HasApiKeys` and `HasPfxPlugin` interfaces and includes error codes defined in the `EimzoErrorCodes` enum.

## Interface Definition

```typescript
export interface IEimzo extends HasApiKeys, HasPfxPlugin {}
```

## Extended Interfaces

### `HasApiKeys`

```typescript
export interface HasApiKeys {
    addApiKey: (domain: string, key: string) => void
}
```

#### Description
Provides functionality to add API keys for specific domains.

#### Methods

| Method                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `addApiKey(domain: string, key: string): void` | Adds an API key for a specified domain. |

##### Parameters
- `domain: string` - The domain for which the API key is being added.
- `key: string` - The API key to associate with the domain.

##### Returns
- `void` - The method does not return a value.

### `HasPfxPlugin`

```typescript
export interface HasPfxPlugin {
    loadPfxCertificates: () => Promise<PfxCertificate[]>;
}
```

#### Description
Provides functionality to load PFX certificates.

#### Methods

| Method                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `loadPfxCertificates(): Promise<PfxCertificate[]>` | Loads and returns an array of PFX certificates. |

##### Returns
- `Promise<PfxCertificate[]>` - A promise that resolves to an array of `PfxCertificate` objects.

## Enum: `EimzoErrorCodes`

```typescript
export enum EimzoErrorCodes {
    UNDEFINED_ERROR,
    UNDEFINED_VERSION,
    NOT_ACTUAL_VERSION,
    PASSWORD_ENTRY_CANCELED,
    SIGN_STRING_IS_EMPTY
}
```

### Description
Defines error codes used within the Eimzo system to handle specific error scenarios.

### Values

| Enum Member                | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `UNDEFINED_ERROR`          | Represents an unspecified or general error.                                  |
| `UNDEFINED_VERSION`        | Indicates that the version of a component or system is undefined.            |
| `NOT_ACTUAL_VERSION`       | Indicates that the version of a component or system is not up-to-date.       |
| `PASSWORD_ENTRY_CANCELED`  | Thrown when a password entry is canceled during a key loading operation.     |
| `SIGN_STRING_IS_EMPTY`     | Thrown when the input string for signing is empty or not a string.           |

## Usage Example

```typescript
// Example implementation of IEimzo
class EimzoService implements IEimzo {
    addApiKey(domain: string, key: string): void {
        console.log(`Adding API key for domain: ${domain}, key: ${key}`);
        // Implementation to store or process the API key
    }

    async loadPfxCertificates(): Promise<PfxCertificate[]> {
        // Example: Load certificates
        const certificates: PfxCertificate[] = [
            new PfxCertificate({
                alias: "cert_alias",
                disk: "C:",
                name: "cert.pfx",
                path: "/path/to/cert.pfx"
            })
        ];
        return certificates;
    }
}

// Usage
const eimzo = new EimzoService();
eimzo.addApiKey("example.com", "api-key-123");
eimzo.loadPfxCertificates().then(certificates => {
    console.log("Loaded certificates:", certificates);
}).catch(error => {
    if (error.code === EimzoErrorCodes.PASSWORD_ENTRY_CANCELED) {
        console.error("Password entry was canceled.");
    }
});
```

## Dependencies

- `PfxCertificate`: A class representing a PFX certificate, used in the `loadPfxCertificates` method.

## Notes

- The `IEimzo` interface serves as a unified contract for Eimzo-related operations, combining API key management and PFX certificate handling.
- Implementations of `IEimzo` must provide concrete logic for `addApiKey` and `loadPfxCertificates`.
- Error handling should account for the specific error codes defined in `EimzoErrorCodes` to manage exceptions appropriately.
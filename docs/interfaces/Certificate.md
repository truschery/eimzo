# Certificate Namespace Documentation

The `Certificate` namespace defines interfaces for working with certificates, including their details and operational methods. It includes the `Instance` interface, which extends the `Details` interface, and provides methods for certificate operations such as signing and key loading.

## Namespace Definition

```typescript
export namespace Certificate {
    export interface Instance extends Details {
        sign: (string: string, params: any) => Promise<string>;
        loadKey: () => Promise<Pfx.LoadKeyResponse>;
        isExpired: () => boolean;
        isPhysical: () => boolean;
    }

    export interface Details {
        fullName: StringOrUndefined;
        serialNumber: StringOrUndefined;
        name: StringOrUndefined;
        surname: StringOrUndefined;
        inn: StringOrUndefined;
        uid: StringOrUndefined;
        pinfl: StringOrUndefined;
        organization: StringOrUndefined;
        type: StringOrUndefined;
        validFrom: DateOrUndefined;
        validTo: DateOrUndefined;
        businesscategory: StringOrUndefined;
        address: StringOrUndefined;
        city: StringOrUndefined;
    }
}
```

## Interfaces

### `Certificate.Details`

#### Description
The `Details` interface defines the structure for certificate metadata, containing various optional fields related to the certificate holder's identity and certificate properties.

#### Properties

| Property            | Type                | Description                                                                 |
|---------------------|---------------------|-----------------------------------------------------------------------------|
| `fullName`          | `undefined \| string` | The full name (Common Name, CN) of the certificate holder.                  |
| `serialNumber`      | `undefined \| string` | The serial number of the certificate.                                       |
| `name`              | `undefined \| string` | The first name of the certificate holder.                                   |
| `surname`           | `undefined \| string` | The surname of the certificate holder.                                      |
| `inn`               | `undefined \| string` | The INN (Taxpayer Identification Number) associated with the certificate.   |
| `uid`               | `undefined \| string` | The unique identifier (UID) of the certificate.                             |
| `pinfl`             | `undefined \| string` | The PINFL (Personal Identification Number) of the certificate holder.       |
| `organization`      | `undefined \| string` | The organization (O) associated with the certificate.                       |
| `type`              | `undefined \| string` | The type (T) of the certificate.                                           |
| `validFrom`         | `undefined \| Date`   | The start date of the certificate's validity period.                        |
| `validTo`           | `undefined \| Date`   | The end date of the certificate's validity period.                          |
| `businesscategory`  | `undefined \| string` | The business category associated with the certificate.                      |
| `address`           | `undefined \| string` | The address (Locality, L) of the certificate holder.                        |
| `city`              | `undefined \| string` | The city (State, ST) of the certificate holder.                             |

### `Certificate.Instance`

#### Description
The `Instance` interface extends the `Details` interface and defines methods for certificate operations, such as signing data, loading keys, and checking certificate status.

#### Extends
- `Details`

#### Methods

| Method                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `sign(string: string, params: any): Promise<string>` | Signs a provided string and returns the signed data. |
| `loadKey(): Promise<Pfx.LoadKeyResponse>` | Loads the certificate's private key and returns a response object. |
| `isExpired(): boolean`     | Checks if the certificate has expired based on its validity period.          |
| `isPhysical(): boolean`    | Determines if the certificate belongs to a physical person.                  |

##### `sign`

```typescript
sign: (string: string, params: any) => Promise<string>
```

###### Description
Signs a provided string using the certificate's private key and returns the signed data, typically in a format like PKCS#7.

###### Parameters
- `string: string` - The string to be signed.
- `params: any` - Optional parameters for the signing operation (e.g., specifying if the signature is detached).

###### Returns
- `Promise<string>` - A promise that resolves to the signed string.

##### `loadKey`

```typescript
loadKey: () => Promise<Pfx.LoadKeyResponse>
```

###### Description
Loads the certificate's private key, returning a response object containing key details.

###### Returns
- `Promise<Pfx.LoadKeyResponse>` - A promise that resolves to a response object containing key information (e.g., key ID).

##### `isExpired`

```typescript
isExpired: () => boolean
```

###### Description
Checks whether the certificate has expired by comparing its `validTo` date with the current date.

###### Returns
- `boolean` - `true` if the certificate is expired, `false` otherwise.

##### `isPhysical`

```typescript
isPhysical: () => boolean
```

###### Description
Determines if the certificate belongs to a physical person, typically by comparing identifiers like `inn` and `uid`.

###### Returns
- `boolean` - `true` if the certificate represents a physical person, `false` otherwise.

## Usage Example

```typescript
// Example implementation of Certificate.Instance
class MyCertificate implements Certificate.Instance {
    fullName: StringOrUndefined = "John Doe";
    serialNumber: StringOrUndefined = "123456789";
    name: StringOrUndefined = "John";
    surname: StringOrUndefined = "Doe";
    inn: StringOrUndefined = "123456789012";
    uid: StringOrUndefined = "123456789012";
    pinfl: StringOrUndefined = undefined;
    organization: StringOrUndefined = undefined;
    type: StringOrUndefined = "personal";
    validFrom: DateOrUndefined = new Date("2023-01-01");
    validTo: DateOrUndefined = new Date("2025-12-31");
    businesscategory: StringOrUndefined = undefined;
    address: StringOrUndefined = "123 Main St";
    city: StringOrUndefined = "Anytown";

    async sign(string: string, params: any): Promise<string> {
        // Example signing logic
        return `Signed: ${string}`;
    }

    async loadKey(): Promise<Pfx.LoadKeyResponse> {
        // Example key loading logic
        return { keyId: "key-123" };
    }

    isExpired(): boolean {
        if (!this.validTo) return false;
        return this.validTo.getTime() <= new Date().getTime();
    }

    isPhysical(): boolean {
        return this.inn === this.uid;
    }
}

// Usage
const cert = new MyCertificate();
console.log(cert.isExpired()); // false
console.log(cert.isPhysical()); // true
cert.sign("Hello, World!", {}).then(signed => {
    console.log(signed); // "Signed: Hello, World!"
});
cert.loadKey().then(keyResponse => {
    console.log(keyResponse); // { keyId: "key-123" }
});
```

## Dependencies

- `Pfx.LoadKeyResponse`: A type or interface defining the structure of the response from the `loadKey` method (not shown in the provided code).
- `StringOrUndefined`: A utility type representing a string or `undefined`.
- `DateOrUndefined`: A utility type representing a `Date` object or `undefined`.

## Notes

- The `Certificate` namespace provides a structured way to define certificate-related interfaces, ensuring consistency across implementations.
- The `Instance` interface is designed to be implemented by classes like `PfxCertificate`, which provide concrete logic for certificate operations.
- Implementations must handle the optional nature of `Details` properties and ensure proper error handling for methods like `sign` and `loadKey`.
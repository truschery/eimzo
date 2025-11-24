# PfxCertificate Class Documentation

The `PfxCertificate` class implements the `Certificate.Instance` interface, providing functionality to handle PFX (Personal Information Exchange) certificates. It parses certificate details from an alias, manages key loading, and supports signing operations using PKCS#7 standards.

## Class Definition

```typescript
export default class PfxCertificate implements Certificate.Instance
```

## Properties

| Property            | Type                | Description                                                                 |
|---------------------|---------------------|-----------------------------------------------------------------------------|
| `fullName`          | `undefined \| string` | The full name (Common Name, CN) extracted from the certificate alias.       |
| `serialNumber`      | `undefined \| string` | The serial number of the certificate.                                       |
| `name`              | `undefined \| string` | The first name of the certificate holder.                                   |
| `surname`           | `undefined \| string` | The surname of the certificate holder.                                      |
| `inn`               | `undefined \| string` | The INN (Taxpayer Identification Number) from the certificate.              |
| `uid`               | `undefined \| string` | The unique identifier (UID) from the certificate.                           |
| `pinfl`             | `undefined \| string` | The PINFL (Personal Identification Number) from the certificate.            |
| `organization`      | `undefined \| string` | The organization associated with the certificate.                       |
| `type`              | `undefined \| string` | The type of the certificate.                                           |
| `validFrom`         | `undefined \| Date`   | The start date of the certificate's validity period.                        |
| `validTo`           | `undefined \| Date`   | The end date of the certificate's validity period.                          |
| `businesscategory`  | `undefined \| string` | The business category from the certificate.                                 |
| `address`           | `undefined \| string` | The address from the certificate.                             |
| `city`              | `undefined \| string` | The city from the certificate.                                  |
| `file`              | `any`               | The file object containing disk, name, and path of the certificate file.    |
| `alias`             | `string`            | The alias string used to extract certificate details.                       |

## Constructor

```typescript
constructor(certificate: Pfx.Certificate)
```

### Description
Initializes a new instance of the `PfxCertificate` class using a provided PFX certificate object.

### Parameters
- `certificate: Pfx.Certificate` - An object containing:
  - `alias: string` - The alias of the certificate.
  - `disk: string` - The disk where the certificate file is stored.
  - `name: string` - The name of the certificate file.
  - `path: string` - The path to the certificate file.


## Methods

### `sign(string: string, params: any): Promise<string>`

```typescript
async sign(string: string, params: any): Promise<string>
```

#### Description
Signs a provided string using the certificate's private key and returns the signed data in PKCS#7 format.

#### Parameters
- `string: string` - The string to be signed.
- `params: any` - Optional parameters, including:
  - `detached: boolean` - Specifies if the signature is detached (default: `false`).

#### Returns
- `Promise<string>` - The signed string in PKCS#7 format (base64-encoded).

#### Throws
- `EimzoError` - If the input string is empty or not a string (`SIGN_STRING_IS_EMPTY`).

#### Behavior
- Validates the input string.
- Converts the string to base64 if it isn't already.
- Loads the certificate key using `loadKey`.
- Creates a PKCS#7 signature using `createPkcs7`.

### `loadKey()`

```typescript
loadKey(): Promise<{ keyId: string }>
```

#### Description
Loads the certificate's private key using the `EimzoClient.pfx.loadKey` method.

#### Returns
- `Promise<{ keyId: string }>` - An object containing the key ID.

#### Parameters
- Uses the `file.disk`, `file.path`, `file.name`, and `alias` properties internally.

### `createPkcs7(base64: string, keyId: string, isDetached: Pkcs7.isDetached = 'no')`

```typescript
createPkcs7(base64: string, keyId: string, isDetached: Pkcs7.isDetached = 'no'): Promise<{ pkcs7_64: string }>
```

#### Description
Creates a PKCS#7 signature for the provided base64-encoded string.

#### Parameters
- `base64: string` - The base64-encoded string to sign.
- `keyId: string` - The key ID of the loaded certificate key.
- `isDetached: Pkcs7.isDetached` - Specifies if the signature is detached (`'yes'` or `'no'`, default: `'no'`).

#### Returns
- `Promise<{ pkcs7_64: string }>` - An object containing the PKCS#7 signature in base64 format.

#### Throws
- `EimzoError` - If password entry is canceled (`PASSWORD_ENTRY_CANCELED`) or for undefined errors (`UNDEFINED_ERROR`).

### `isExpired(): boolean`

```typescript
isExpired(): boolean
```

#### Description
Checks if the certificate has expired based on its `validTo` date.

#### Returns
- `boolean` - `true` if the certificate is expired, `false` otherwise.

#### Behavior
- Returns `false` if `validFrom` or `validTo` is not a valid `Date`.
- Compares the `validTo` date with the current date to determine if the certificate has expired.

### `isPhysical()`

```typescript
isPhysical(): boolean
```

#### Description
Determines if the certificate belongs to a physical person by comparing `inn` and `uid`.

#### Returns
- `boolean` - `true` if `inn` equals `uid`, indicating a physical person, `false` otherwise.

## Usage Example

```typescript
const certificate = new PfxCertificate({
  alias: "certificate_alias",
  disk: "C:",
  name: "cert.pfx",
  path: "/path/to/cert.pfx"
});

// Sign a string
const signedData = await certificate.sign("Hello, World!", { detached: false });
console.log(signedData); // Outputs the PKCS#7 signed string

// Check if certificate is expired
console.log(certificate.isExpired()); // true or false

// Check if certificate is for a physical person
console.log(certificate.isPhysical()); // true or false
```

## Dependencies

- `EimzoClient`: Provides methods for loading keys and creating PKCS#7 signatures.
- `Alias`: Utility class for parsing certificate alias strings.
- `EimzoError`: Custom error class for handling specific error cases.
- Utility functions: `isEmpty`, `isString`, `isBase64`, `isDate`, `btoa`.

## Error Codes

- `EimzoErrorCodes.SIGN_STRING_IS_EMPTY`: Thrown when the input string for signing is empty or not a string.
- `EimzoErrorCodes.PASSWORD_ENTRY_CANCELED`: Thrown when password entry is canceled during key loading.
- `EimzoErrorCodes.UNDEFINED_ERROR`: Thrown for unspecified errors during PKCS#7 creation.
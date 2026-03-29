# PfxCertificate Class

When you fetch certificates using `eimzo.pfx.list()`, the SDK returns an array of `PfxCertificate` instances.

Each instance represents a single cryptographic key. It acts as an **Active Record**, meaning it holds the parsed data of the certificate and provides built-in methods (like `.sign()` or `.isValid()`) to interact with it securely.

---

## Properties

Unlike the raw E-IMZO API which returns a messy `X.500` alias string, the `PfxCertificate` class parses the data into strictly typed, easy-to-use properties. Date fields are automatically converted to native JavaScript `Date` objects.

```typescript
class PfxCertificate {
  // Parsed Alias Properties
  fullName?: string;
  serialNumber?: string;
  name?: string;
  surname?: string;
  inn?: string;
  uid?: string;
  pinfl?: string;
  organization?: string;
  type?: string;
  businesscategory?: string;
  address?: string;
  city?: string;
  
  validFrom?: Date;
  validTo?: Date;

  // Internal E-IMZO File Information
  alias: string;
  file: {
    disk: string;
    name: string;
    path: string;
  };
}
```

#### Example: Displaying details in your UI
```typescript
const certs = await eimzo.pfx.list();

certs.forEach(cert => {
  console.log(`Key owner: ${cert.fullName}`);
  
  if (cert.isPhysical()) {
    console.log(`Personal PINFL: ${cert.pinfl}`);
  } else {
    console.log(`Company INN: ${cert.inn} (${cert.organization})`);
  }
});
```

---

## Helper Methods

The class provides convenient synchronous helper methods to quickly check the status and type of the certificate.

### `isValid(): boolean`
Checks if the certificate is currently valid by comparing the `validTo` property against the current system time (`Date.now()`).

### `isExpired(): boolean`
The inverse of `isValid()`. Returns `true` if the certificate's validity period has ended.

### `isPhysical(): boolean`
Determines if the certificate belongs to an Individual rather than a Legal Entity. Under the hood, it applies the standard Uzbekistan PKI rule by checking if `inn === uid`.

---

## Action Methods

### `sign(string, params?)`

Triggers the E-IMZO application to sign the provided data using this specific certificate. The user will be prompted to enter their PIN code by the local E-IMZO agent.

**Arguments:**
1. `string` *(string)* — The data or document you want to sign.
2. `params` *(any)* — Optional configuration for the PKCS#7 container

**Returns:** `Promise<string>` (The Base64 encoded PKCS#7 signature).

```typescript
const stringToSign = "Hello World";

const cert = (await eimzo.pfx.list())[0];

if (cert.isValid()) {
  const signature = await cert.sign(stringToSign);
  console.log("Success! Signature:", signature);
} else {
  console.error("This certificate is expired!");
}
```

### `loadKey()`

A lower-level method that explicitly loads the certificate key into the active memory of the E-IMZO module using its disk, path, and alias.

*Note: In most high-level operations, the SDK handles key loading automatically during the `.sign()` process.*
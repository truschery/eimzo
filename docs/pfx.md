# PFX Module (`eimzo.pfx`)

The PFX module is responsible for securely fetching and filtering certificates from the user's local E-IMZO storage, including connected USB hardware tokens.

You can access this module via the `pfx` property of your `Eimzo` instance.

---

## Methods

### `list(filters?)`

Loads the list of available certificates. You can pass an optional `CertificateFilter` object to let the SDK handle the parsing and filtering for you right out of the box.
**Returns:** `Promise<Certificate[]>`

#### Example: Basic Usage
```typescript
// Fetch all certificates (not recommended for production UI)
const allCerts = await eimzo.pfx.list();
```

#### Example: Smart Filtering (Recommended)
```typescript
// Scenario A: B2B Authorization
// Find all valid corporate keys for a specific company
const corporateCerts = await eimzo.pfx.list({
  inn: '123456789',
  validOnly: true
});

// Scenario B: B2C / Individual User Cabinet
// Find a specific individual's personal key by PINFL
const personalCerts = await eimzo.pfx.list({
  pinfl: '31201890000000',
  validOnly: true
});
```

---

## Interfaces

### `CertificateFilter`

Use this interface to narrow down the list of returned certificates. All fields are optional.

| Property        | Type | Description |
|:----------------| :--- | :--- |
| `validOnly`     | `boolean` | If `true`, strictly excludes expired certificates or certificates whose validity period has not yet started. |
| `inn`           | `string` \| `string[]` | Filter by Company INN. Accepts a single string or an array of strings. |
| `pinfl`         | `string` \| `string[]` | Filter by Personal PINFL (14 digits). Ideal for identifying individuals. |
| `isLegalEntity` | `boolean` | `true` for Corporate keys (has organization name), `false` for Individual keys. |
| `search`        | `string` | Case-insensitive search by Organization Name or Full Name. Great for UI search inputs. |

---

## What's Next?

The `list()` method returns an array of `Certificate` class instances.
Check out the [Certificate Class](./certificate.md) documentation to learn how to access the parsed owner details and use the `.sign()` method.
# PKCS7 Module (`eimzo.pkcs7`)

The PKCS7 module handles the core cryptographic operations of the SDK. It is responsible for creating PKCS#7/CMS signature containers, managing attached/detached formats, integrating Time Stamping Protocols, and gracefully handling E-IMZO exceptions.

*Note: While you can use this module directly, it is highly recommended to use the `.sign()` method directly on the `PfxCertificate` instance, which acts as a convenient wrapper around this module.*

---

## Methods

### `sign(cert, signableContent, params?)`

The primary method to generate a PKCS#7 signature. It automatically handles string validation, Base64 encoding, and key loading.

**Arguments:**
1. `cert` *(Certificate)* — The certificate instance you want to use for signing.
2. `signableContent` *(string)* — The raw string or Base64 encoded document to sign. If the string is not Base64, the module will automatically encode it using `btoa()`.
3. `params` *(any)* — Optional parameters.
    - `params.detached`: Set to `true` to create a detached signature (does not include the original content). Defaults to an attached signature.

**Returns:** `Promise<string>`

#### Features under the hood:
- **Empty String Protection:** Throws an `EimzoError` (`SIGN_STRING_IS_EMPTY`) if the content is empty.
- **Smart Encoding:** Automatically detects if the string is already Base64-encoded to prevent double-encoding.
- **Timestamp Integration:** If you provided a `getTimestamp` function in your initial `EimzoOptions`, this method will automatically fetch the timestamp using the signature's hex value.

#### Example: Direct Usage
```typescript
const cert = (await eimzo.pfx.list())[0];

try {
  const signature = await eimzo.pkcs7.sign(cert, "My document content", {
    detached: true
  });
  console.log("Generated PKCS#7:", signature);
} catch (error) {
  console.error("Signing failed:", error.message);
}
```

---

### `createPkcs7(base64, keyId, isDetached)`

A lower-level method that communicates directly with the underlying `@truschery/eimzo-api` transport client to trigger the signature process.

**Arguments:**
- `base64` *(string)* — The strictly Base64-encoded document.
- `keyId` *(string)* — The active Key ID obtained after loading the certificate into the E-IMZO memory.
- `isDetached` *(string)* — `'yes'` or `'no'`.

#### Error Handling
This method catches raw E-IMZO agent errors and maps them to developer-friendly `EimzoError` exceptions.

For instance, if the user clicks "Cancel" when prompted for their PIN code, the E-IMZO agent normally returns a cryptic `-5` status. The module cleanly catches this and throws an `EimzoErrorCodes.PASSWORD_ENTRY_CANCELED` error.

#### Example: Handling User Cancellations
```typescript
import { EimzoErrorCodes } from '@truschery/eimzo/types';

try {
  await cert.sign("Data");
} catch (error) {
  if (error.code === EimzoErrorCodes.PASSWORD_ENTRY_CANCELED) {
    console.warn("The user closed the PIN code window.");
  } else {
    console.error("An unexpected error occurred:", error.message);
  }
}
```
# API Key Security

ACOT places high importance on the security of user API keys. This document explains how ACOT handles and protects your API key.

## API Key Storage Options

ACOT provides two methods for handling API keys:

1. **Local encrypted storage**: The default option, API keys are encrypted in your browser before storage
2. **Do not save**: API keys are not saved at all

## Encryption Protection Mechanism

When you choose to save your API key, ACOT employs the following security measures:

### Client-side Encryption

1. **Strong encryption algorithm**: ACOT uses the AES encryption algorithm to encrypt your API key in your browser
2. **Unique key**: Each API configuration has its own unique encryption key
3. **Local storage**: Encryption keys are only saved in your browser and are not stored on the server
4. **Secure transmission**: When the client sends configuration data to the server, the API key is transmitted as encrypted ciphertext

### Server-side Storage
1. **Temporary decryption**: The server only temporarily uses the encryption key passed from the client to decrypt when calling the model API. After decryption, the encryption key is discarded immediately and not stored
2. **Ciphertext storage**: When storing API keys, the server stores the encrypted ciphertext data passed from the client, not the plaintext API key

### Preferences

You can control API key storage behavior on your profile page:

- When enabled, newly configured API keys will be automatically encrypted and saved
- When disabled, new configurations will not store API keys, and ACOT will clear all API keys from your existing configurations. Please note this before disabling the setting

### Note

Since the server does not store encryption keys, if you forget an encryption key for a configuration, you will need to recreate that configuration.

## Security Recommendations

To ensure maximum security, we recommend:

1. Use strong encryption keys to protect your API keys
2. Regularly change your critical API keys
3. If you're only using temporarily, consider disabling the automatic encryption and saving of API keys in your profile page settings

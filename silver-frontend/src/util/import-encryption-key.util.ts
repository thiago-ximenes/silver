function ensureKeyLength(key: string): string {
  if (key.length > 32) {
    return key.slice(0, 32);
  }
  while (key.length < 32) {
    key += "0";
  }
  return key;
}

export async function importEncryptionKey(encryptionKeyString: string) {
  const encoder = new TextEncoder();
  const encryptionKeyEncoded = encoder.encode(
    ensureKeyLength(encryptionKeyString),
  );
  return await window.crypto.subtle.importKey(
    "raw",
    encryptionKeyEncoded,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"],
  );
}

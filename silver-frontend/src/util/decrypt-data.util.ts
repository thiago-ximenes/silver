export async function decryptData(
  secretKey: CryptoKey,
  iv: Uint8Array,
  encryptedData: BufferSource,
) {
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    encryptedData,
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

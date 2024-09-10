export async function encryptData(data: string, secretKey: CryptoKey) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      length: 256,
      iv,
    },
    secretKey,
    encodedData,
  );
  return { iv, encryptedData };
}

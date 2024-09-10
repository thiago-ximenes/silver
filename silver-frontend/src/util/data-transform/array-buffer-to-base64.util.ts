export default function arrayBufferToBase64Util(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binary = String.fromCharCode(...bytes);
  return Buffer.from(binary, "binary").toString("base64");
}

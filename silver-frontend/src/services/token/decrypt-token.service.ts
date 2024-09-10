import base64ToUint8Array from "../../util/data-transform/base-64-to-uint8-array.util.ts";
import base64ToArrayBufferUtil from "../../util/data-transform/base64-to-array-buffer.util.ts";
import { importEncryptionKey } from "../../util/import-encryption-key.util.ts";
import { cryptoConfig } from "../../config/crypto.config.ts";
import { decryptData } from "../../util/decrypt-data.util.ts";

export async function decryptTokenService(accessToken: {
  iv: string;
  encryptedData: string;
}) {
  const iv = base64ToUint8Array(accessToken.iv);
  const data = base64ToArrayBufferUtil(accessToken.encryptedData);
  const key = await importEncryptionKey(cryptoConfig.CRYPTO_KEY);

  return decryptData(key, iv, data);
}

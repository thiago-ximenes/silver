import { importEncryptionKey } from "../../util/import-encryption-key.util.ts";
import { cryptoConfig } from "../../config/crypto.config.ts";
import { encryptData } from "../../util/encrypt-data.util.ts";
import arrayBufferToBase64Util from "../../util/data-transform/array-buffer-to-base64.util.ts";

export async function encryptTokenService(token: string): Promise<{
  encryptedData: string;
  iv: string;
}> {
  const key = await importEncryptionKey(cryptoConfig.CRYPTO_KEY);
  const encryptedToken = await encryptData(token, key);

  return {
    encryptedData: arrayBufferToBase64Util(encryptedToken.encryptedData),
    iv: arrayBufferToBase64Util(encryptedToken.iv),
  };
}

import { decryptTokenService } from "../services/token/decrypt-token.service.ts";

export async function getDecryptedTokenUtil() {
  const token = JSON.parse(sessionStorage.getItem("token") || "null");

  if (!token || token === "null") {
    return null;
  }

  return await decryptTokenService(token);
}

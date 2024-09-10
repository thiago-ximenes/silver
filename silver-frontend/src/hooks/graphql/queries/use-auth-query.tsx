import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";
import { useSessionStorage } from "../../use-session-storage.tsx";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";
import { useEffect, useState } from "react";

export function useAuthQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>,
) {
  const [token] = useSessionStorage("token", null);
  const [decryptedToken, setDecryptedToken] = useState<string | null>(null);

  useEffect(() => {
    async function decryptToken() {
      const decryptedToken = await decryptTokenService(token);
      setDecryptedToken(decryptedToken);
    }

    decryptToken();
  }, [token]);

  return useQuery<TData, TVariables>(query, {
    ...options,
    skip: !decryptedToken,
    context: {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    },
  });
}

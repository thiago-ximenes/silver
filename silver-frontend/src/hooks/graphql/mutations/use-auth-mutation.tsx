import { useSessionStorage } from "../../use-session-storage.tsx";
import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationFunctionOptions,
  MutationHookOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";

export function useAuthMutation(
  mutation: DocumentNode | TypedDocumentNode<never, OperationVariables>,
  options?: MutationHookOptions<never, OperationVariables>,
) {
  const [token] = useSessionStorage("token", null);

  const [mutate, rest] = useMutation(mutation, options);

  async function handleMutate(
    op?:
      | MutationFunctionOptions<
          never,
          OperationVariables,
          DefaultContext,
          ApolloCache<unknown>
        >
      | undefined,
  ) {
    const decryptedToken = await decryptTokenService(token);

    const context = {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    };

    await mutate({
      ...op,
      context,
    });
  }

  return [handleMutate, rest] as unknown as ReturnType<typeof useMutation>;
}

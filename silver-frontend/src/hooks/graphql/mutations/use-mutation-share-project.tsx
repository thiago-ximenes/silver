import { useSessionStorage } from "../../use-session-storage.tsx";
import { Route } from "../../../routes/_layout/_auth/project/$projectId/share.tsx";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";

const SHARE_PROJECT_MUTATION = gql`
  mutation ShareProject($projectId: Int!, $roleId: Int!, $userId: Int!) {
    shareProject(projectId: $projectId, roleId: $roleId, userId: $userId) {
      id
    }
  }
`;

export function useMutationShareProject() {
  const [token] = useSessionStorage("token", null);

  const params = Route.useParams();

  const [mutate] = useMutation(SHARE_PROJECT_MUTATION, {
    onCompleted: async () => {
      toast.success("Projeto compartilhado com sucesso!");
    },
    onError: (error) => {
      if (error.message === "You do not have the required role") {
        return toast.error("Você não tem a permissão necessária");
      }
      toast.error("Erro ao compartilhar projeto");
    },
  });

  async function shareProject(roleId: number, userId: number) {
    const decryptedToken = await decryptTokenService(token);

    await mutate({
      variables: {
        projectId: Number(params.projectId),
        roleId,
        userId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      },
    });
  }

  return shareProject;
}

import { useSessionStorage } from "../../use-session-storage.tsx";
import { useRouter } from "@tanstack/react-router";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import {
  GET_PROJECT_QUERY,
  Route,
} from "../../../routes/_layout/_auth/project/$projectId";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($taskId: Int!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`;

export function useMutationDeleteTask() {
  const [token] = useSessionStorage("token", null);
  const router = useRouter();

  const params = Route.useParams();

  const [mutate] = useMutation(DELETE_TASK_MUTATION, {});

  async function deleteTask(taskId: number) {
    const decryptedToken = await decryptTokenService(token);

    await mutate({
      onCompleted: async () => {
        toast.success("Tarefa deletada com sucesso!");
        await router.invalidate();
      },
      onError: (e) => {
        console.log(e);
        toast.error("Erro ao deletar tarefa");
      },
      variables: {
        taskId,
      },
      refetchQueries: [
        {
          query: GET_PROJECT_QUERY,
          variables: {
            projectId: Number(params.projectId),
          },
        },
      ],
      context: {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      },
      update: (cache) => {
        const existing = cache.readQuery<{
          project: {
            id: number;
            title: string;
            tasks: Array<{
              id: number;
              title: string;
              description: string;
              done: boolean;
              dueDate: string;
            }>;
          };
        }>({
          query: GET_PROJECT_QUERY,
          variables: {
            projectId: Number(params.projectId),
          },
        });

        if (existing) {
          const newTasks = existing.project.tasks.filter(
            (task) => task.id !== taskId,
          );

          cache.writeQuery({
            query: GET_PROJECT_QUERY,
            variables: {
              projectId: Number(params.projectId),
            },
            data: {
              project: {
                ...existing.project,
                tasks: newTasks,
              },
            },
          });
        }
      },
    });
  }

  return deleteTask;
}

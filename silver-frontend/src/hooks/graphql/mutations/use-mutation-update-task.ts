import { gql, useMutation } from "@apollo/client";
import { useSessionStorage } from "../../use-session-storage.tsx";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";
import {
  GET_PROJECT_QUERY,
  Route,
} from "../../../routes/_layout/_auth/project/$projectId";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";
import { UpdateTaskFormValues } from "../../../schema/form/update-task.form.schema.ts";

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskId: Int!
    $title: String!
    $description: String
    $dueDate: DateTime
    $done: Boolean
  ) {
    updateTask(
      taskId: $taskId
      updateTaskInput: {
        title: $title
        description: $description
        dueDate: $dueDate
        done: $done
      }
    ) {
      id
      title
      description
      dueDate
      done
    }
  }
`;

export function useMutationUpdateTask() {
  const [token] = useSessionStorage("token", null);

  const router = useRouter();

  const params = Route.useParams();

  const [mutate] = useMutation(UPDATE_TASK, {
    onCompleted: async () => {
      toast.success("Tarefa atualizada com sucesso!");
      await router?.invalidate();
    },
    onError: (error) => {
      if (error.message === "You do not have the required role") {
        return toast.error("Você não tem a permissão necessária");
      }

      toast.error("Erro ao atualizar tarefa");
    },
    refetchQueries: [
      {
        query: GET_PROJECT_QUERY,
        variables: {
          projectId: Number(params.projectId),
        },
      },
    ],
    update: (cache, { data }) => {
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
        cache.writeQuery({
          query: GET_PROJECT_QUERY,
          data: {
            project: {
              ...existing.project,
              // preciso adicionar o atualizado na exata posição que ele estava
              // para não perder a ordem

              tasks: existing.project.tasks.map((task) => {
                if (task.id === data.updateTask.id) {
                  return data.updateTask;
                }

                return task;
              }),
            },
          },
        });
      }
    },
  });

  async function updateTask(taskId: number, data: UpdateTaskFormValues) {
    const decryptedToken = await decryptTokenService(token);

    await mutate({
      variables: {
        taskId,
        ...data,
      },
      context: {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      },
    });
  }

  return updateTask;
}

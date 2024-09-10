import { useSessionStorage } from "../../use-session-storage.tsx";
import { gql, useMutation } from "@apollo/client";
import { decryptTokenService } from "../../../services/token/decrypt-token.service.ts";
import { CreateTaskFormValues } from "../../../schema/form/create-task.form.schema.ts";
import {
  GET_PROJECT_QUERY,
  Route,
} from "../../../routes/_layout/_auth/project/$projectId";
import { toast } from "react-toastify";
import { useRouter } from "@tanstack/react-router";

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $projectId: Int!
    $title: String!
    $description: String
    $dueDate: DateTime
  ) {
    createNewTask(
      projectId: $projectId
      createTaskInput: {
        title: $title
        description: $description
        dueDate: $dueDate
      }
    ) {
      id
      title
      description
      dueDate
      done
      projectId
    }
  }
`;

export function useMutationCreateTask() {
  const [token] = useSessionStorage("token", null);

  const router = useRouter();

  const [mutate] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: async () => {
      toast.success("Tarefa criada com sucesso!");
      await router?.invalidate();
    },
    onError: (error) => {
      if (error.message === "You do not have the required role") {
        return toast.error("Você não tem a permissão necessária");
      }
      toast.error("Erro ao criar tarefa");
    },
    refetchQueries: [
      {
        query: GET_PROJECT_QUERY,
        variables: {
          projectId: Number(Route.useParams().projectId),
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
          projectId: Number(data.createNewTask.projectId),
        },
      });

      if (existing) {
        cache.writeQuery({
          query: GET_PROJECT_QUERY,
          variables: {
            projectId: Number(data.createNewTask.projectId),
          },
          data: {
            project: {
              ...existing.project,
              tasks: [
                ...existing.project.tasks,
                {
                  id: data.createNewTask.id,
                  title: data.createNewTask.title,
                  description: data.createNewTask.description,
                  done: data.createNewTask.done,
                  dueDate: data.createNewTask.dueDate,
                },
              ],
            },
          },
        });
      }
    },
  });

  async function createTask(projectId: number, task: CreateTaskFormValues) {
    const decryptedToken = await decryptTokenService(token);

    await mutate({
      context: {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      },
      variables: {
        projectId: projectId,
        ...task,
      },
    });
  }

  return createTask;
}

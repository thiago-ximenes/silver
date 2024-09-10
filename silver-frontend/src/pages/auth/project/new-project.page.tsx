import { Box, Button, TextField, Typography } from "@mui/material";
import { gql } from "@apollo/client";
import { useAuthMutation } from "../../../hooks/graphql/mutations/use-auth-mutation.tsx";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { GET_MY_PROJECTS_QUERY } from "../dashboard.page.tsx";

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($title: String!) {
    createProject(title: $title) {
      id
      title
    }
  }
`;

type CreateProjectData = {
  createProject: {
    id: number;
    title: string;
  };
};

export function NewProjectPage() {
  const router = useRouter();

  const [mutate, { loading }] = useAuthMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: async () => {
      await router.invalidate();
      toast.success("Projeto criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar projeto");
    },
    update: (cache, { data }) => {
      const existing = cache.readQuery<{
        projects: Array<{
          id: number;
          title: string;
        }>;
      }>({
        query: GET_MY_PROJECTS_QUERY,
      });

      if (existing) {
        cache.writeQuery({
          query: GET_MY_PROJECTS_QUERY,
          data: {
            projects: [
              ...existing.projects,
              {
                id: (data as unknown as CreateProjectData)?.createProject.id,
                title: (data as unknown as CreateProjectData)?.createProject
                  .title,
              },
            ],
          },
        });
      }
    },
  });

  const form = useForm();

  const submit = form.handleSubmit(async (data) => {
    await mutate({
      variables: {
        title: data.title,
      },
    });
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" variantMapping={{ h4: "h2" }}>
        Novo Projeto
      </Typography>
      <Box
        component="form"
        onSubmit={submit}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
        maxWidth={720}
      >
        <TextField label="Título" fullWidth {...form.register("title")} />
        <LoadingButton
          loading={loading}
          type="submit"
          loadingIndicator="Criando..."
        >
          Criar Projeto
        </LoadingButton>
        <Button onClick={() => router.history.back()}>Voltar</Button>
      </Box>
    </Box>
  );
}

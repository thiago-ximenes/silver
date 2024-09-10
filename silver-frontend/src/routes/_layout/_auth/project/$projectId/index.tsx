import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "../../../../../pages/auth/project/project.page.tsx";
import { client } from "../../../../../libs/apollo.client.tsx";
import { gql } from "@apollo/client";
import { getDecryptedTokenUtil } from "../../../../../util/get-decrypted-token.util.ts";

export const GET_PROJECT_QUERY = gql`
  query GetProject($projectId: Int!) {
    project(id: $projectId) {
      id
      title
      tasks {
        id
        title
        description
        done
        dueDate
      }
    }
  }
`;

export const Route = createFileRoute("/_layout/_auth/project/$projectId/")({
  component: ProjectPage,
  loader: async ({ params }) => {
    const token = await getDecryptedTokenUtil();

    return client.query({
      query: GET_PROJECT_QUERY,
      variables: {
        projectId: Number(params.projectId),
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  },
});

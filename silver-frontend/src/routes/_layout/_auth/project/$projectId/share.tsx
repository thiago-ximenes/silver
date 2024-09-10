import { createFileRoute } from "@tanstack/react-router";
import { SharePage } from "../../../../../pages/auth/project/share.page.tsx";
import { gql } from "@apollo/client";
import { client } from "../../../../../libs/apollo.client.tsx";
import { getDecryptedTokenUtil } from "../../../../../util/get-decrypted-token.util.ts";
import { GET_PROJECT_QUERY } from "./index.tsx";

const GET_USERS_WITHOUT_ME_QUERY = gql`
  query GetUsersWithoutMe {
    usersWithoutMe {
      id
      username
    }
  }
`;

const GET_ROLES_QUERY = gql`
  query GetRoles {
    allRoles {
      id
      name
    }
  }
`;

export const Route = createFileRoute("/_layout/_auth/project/$projectId/share")(
  {
    component: SharePage,
    loader: async ({ params }) => {
      const token = await getDecryptedTokenUtil();

      const context = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const [roles, users, project] = await Promise.all([
        client.query({
          query: GET_ROLES_QUERY,
          context,
        }),
        client.query({
          query: GET_USERS_WITHOUT_ME_QUERY,
          context,
        }),
        client.query({
          query: GET_PROJECT_QUERY,
          context,
          variables: {
            projectId: Number(params.projectId),
          },
        }),
      ]);

      return {
        roles: roles.data.allRoles,
        users: users.data.usersWithoutMe,
        project: project.data.project,
      };
    },
  },
);

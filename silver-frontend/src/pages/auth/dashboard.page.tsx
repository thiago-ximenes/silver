import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { gql } from "@apollo/client";
import { useAuthQuery } from "../../hooks/graphql/queries/use-auth-query.tsx";

export const GET_MY_PROJECTS_QUERY = gql`
  query GetMyProjects {
    projects {
      id
      title
    }
  }
`;

export function DashboardPage() {
  const { data } = useAuthQuery<{
    projects: Array<{
      id: number;
      title: string;
    }>;
  }>(GET_MY_PROJECTS_QUERY);
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Card>
        <CardActionArea
          component={Link}
          to="/project/"
          sx={{
            width: "100%",
            padding: 2,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Novo Projeto +
          </Typography>
        </CardActionArea>
      </Card>
      <Typography
        variant="h4"
        variantMapping={{
          h4: "h2",
        }}
      >
        Meus Projetos
      </Typography>
      <Grid container spacing={2}>
        {data?.projects.map((project) => (
          <Grid item xs={12} sm={4} key={project.id}>
            <Card>
              <CardActionArea
                component={Link}
                to="/project/$projectId"
                params={{
                  projectId: project.id.toString(),
                }}
                sx={{
                  width: "100%",
                  padding: 2,
                }}
              >
                <Typography variant="h5" textAlign="center">
                  {project.title}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

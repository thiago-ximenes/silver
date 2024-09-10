import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { PermissionsModule } from './permissions/permissions.module';
import authConstants from './auth/auth.constants';
import { AuthGuard } from './auth/auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { PermissionsGuard } from './permissions/permissions.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    TasksModule,
    ProjectsModule,
    PermissionsModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: authConstants.appGuard,
      useClass: AuthGuard,
    },
    {
      provide: authConstants.appGuard,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}

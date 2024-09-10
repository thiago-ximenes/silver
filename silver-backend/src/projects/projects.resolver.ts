import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Project } from './entities/project.entity';
import { PermissionEnum } from '../permissions/enums/permission.enum';
import { Permission } from '../permissions/decorators/permission.decorator';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => Project)
  async createProject(
    @CurrentUser() user: { sub: number },
    @Args('title') title: string,
  ) {
    return this.projectsService.createProject(title, user.sub);
  }

  @Query(() => [Project])
  async projects(@CurrentUser() user: { sub: number }) {
    return this.projectsService.findMany(user.sub);
  }

  @Permission(PermissionEnum.READ)
  @Query(() => Project)
  async project(
    @CurrentUser() user: { sub: number },
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.projectsService.findOne(id, user.sub);
  }

  @Permission(PermissionEnum.EDIT)
  @Mutation(() => Project)
  async updateProject(
    @CurrentUser() user: { sub: number },
    @Args('id') id: number,
    @Args('title') title: string,
  ) {
    return this.projectsService.updateProject(id, title, user.sub);
  }

  @Permission(PermissionEnum.SHARE)
  @Mutation(() => Project)
  async shareProject(
    @Args('projectId', {
      type: () => Int,
    })
    projectId: number,
    @Args('userId', {
      type: () => Int,
    })
    userId: number,
    @Args('roleId', {
      type: () => Int,
    })
    roleId: number,
  ) {
    return this.projectsService.shareProject(projectId, userId, roleId);
  }
}

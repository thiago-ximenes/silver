import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './decorators/permission.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = GqlExecutionContext.create(context).getContext().req;

    const user = request.user;
    let projectId = +request.body.variables.projectId;

    if (!projectId) {
      const taskId = +request.body.variables.taskId;

      const task = await this.prismaService.task.findFirst({
        where: {
          id: taskId,
        },
        select: {
          projectId: true,
        },
      });

      projectId = task.projectId;
    }

    const userRole = await this.prismaService.projectRoleUser.findFirst({
      where: {
        userId: user.sub,
        projectId: projectId,
      },
      include: {
        role: {
          include: { permissions: true },
        },
      },
    });

    if (!userRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    const hasRole = requiredPermissions.some((permission) =>
      userRole.role.permissions.some(
        (p) => p.name.toLowerCase() === permission.toLowerCase(),
      ),
    );

    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}

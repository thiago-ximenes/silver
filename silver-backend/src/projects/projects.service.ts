import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async createProject(title: string, userId: number) {
    const project = await this.prismaService.project.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const role = await this.prismaService.role.findFirst({
      where: {
        name: 'admin',
      },
    });

    await this.prismaService.projectRoleUser.create({
      data: {
        project: {
          connect: {
            id: project.id,
          },
        },
        role: {
          connect: {
            id: role.id,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return project;
  }

  async findMany(userId: number) {
    return this.prismaService.project.findMany({
      where: {
        ProjectRoleUser: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prismaService.project.findFirst({
      where: {
        id,
        ProjectRoleUser: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async updateProject(id: number, title: string, userId: number) {
    return this.prismaService.project.update({
      where: {
        id,
        ProjectRoleUser: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      data: {
        title,
      },
    });
  }

  async deleteProject(id: number, userId: number) {
    const project = await this.findOne(id, userId);

    return this.prismaService.project.delete({
      where: { id: project.id },
    });
  }

  async shareProject(projectId: number, userId: number, roleId: number) {
    console.log(projectId, userId, roleId);
    const projectRoleUser = await this.prismaService.projectRoleUser.upsert({
      where: {
        projectId_roleId_userId: {
          userId,
          roleId,
          projectId,
        },
      },
      create: {
        project: {
          connect: {
            id: projectId,
          },
        },
        role: {
          connect: {
            id: roleId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        project: {
          connect: {
            id: projectId,
          },
        },
        role: {
          connect: {
            id: roleId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        project: true,
      },
    });

    return projectRoleUser.project;
  }
}

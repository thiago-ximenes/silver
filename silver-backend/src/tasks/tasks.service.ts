import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(projectId: number, createTaskInput: CreateTaskInput) {
    return this.prismaService.task.create({
      data: {
        ...createTaskInput,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }

  async deleteTask(taskId: number) {
    return this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async updateTask(taskId: number, updateTaskInput: UpdateTaskInput) {
    return this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...updateTaskInput,
      },
    });
  }
}

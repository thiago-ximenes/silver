import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Permission } from '../permissions/decorators/permission.decorator';
import { PermissionEnum } from '../permissions/enums/permission.enum';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Permission(PermissionEnum.CREATE)
  @Mutation(() => Task)
  async createNewTask(
    @Args('projectId', {
      type: () => Int!,
    })
    projectId: number,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    return this.tasksService.createTask(projectId, createTaskInput);
  }

  @Permission(PermissionEnum.DELETE)
  @Mutation(() => Task)
  async deleteTask(
    @Args('taskId', {
      type: () => Int!,
    })
    taskId: number,
  ) {
    return this.tasksService.deleteTask(taskId);
  }

  @Permission(PermissionEnum.EDIT)
  @Mutation(() => Task)
  async updateTask(
    @Args('taskId', {
      type: () => Int!,
    })
    taskId: number,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    return this.tasksService.updateTask(taskId, updateTaskInput);
  }
}

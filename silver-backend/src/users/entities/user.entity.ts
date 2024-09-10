import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Project } from '../../projects/entities/project.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Role])
  roles: Array<Role>;

  @Field(() => [Task])
  task: Array<Task>;

  @Field(() => [Project])
  project: Array<Project>;
}

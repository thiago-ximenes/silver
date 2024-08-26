import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [Task])
  tasks: Array<Task>;
}

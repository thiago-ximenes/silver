import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  dueDate: Date;

  @Field()
  priority: string;

  @Field()
  done: boolean;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [Project])
  projects: Array<Project>;
}

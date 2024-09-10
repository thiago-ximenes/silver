import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  description: string | null;

  @Field(() => Date, {
    nullable: true,
  })
  dueDate: Date;

  @Field()
  priority: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  done: boolean | null;

  @Field(() => Int)
  projectId: number;

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

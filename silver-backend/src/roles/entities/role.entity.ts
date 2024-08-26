import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@ObjectType()
export class Role {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Permission])
  permissions: Array<Permission>;

  @Field(() => [User])
  users: Array<User>;
}

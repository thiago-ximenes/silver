import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';

@ObjectType()
export class Permission {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Role])
  roles: Array<Role>;
}

import { Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role])
  async allRoles() {
    return this.rolesService.allRoles();
  }
}

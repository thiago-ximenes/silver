import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Injectable()
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async usersWithoutMe(@CurrentUser() user: { sub: number }) {
    return this.usersService.findAllWithOutMe(user.sub);
  }

  @Query(() => User)
  async me(@CurrentUser() user: { sub: number }) {
    return this.usersService.me(user.sub);
  }
}

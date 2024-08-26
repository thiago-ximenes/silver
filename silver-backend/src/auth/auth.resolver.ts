import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from './entities/login-response.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput);
  }

  @Public()
  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}

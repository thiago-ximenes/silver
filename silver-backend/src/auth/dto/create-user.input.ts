import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Field(() => String, { description: 'username' })
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Field(() => String, { description: 'password' })
  password: string;
}

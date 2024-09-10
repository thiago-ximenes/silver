import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Field(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}

import { CreateTaskInput } from './create-task.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  done?: boolean;
}

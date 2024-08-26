import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async createUser(createUserInput: CreateUserInput) {
    const user = await this.prismaService.user.findUnique({
      where: { username: createUserInput.username },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.prismaService.user.create({
      data: createUserInput,
    });
  }
}

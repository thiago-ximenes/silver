import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginResponse } from './entities/login-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserInput: CreateUserInput) {
    const user = await this.prismaService.user.findUnique({
      where: { username: createUserInput.username },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);

    const loginResponse = new LoginResponse();
    loginResponse.token = token;

    return loginResponse;
  }
}

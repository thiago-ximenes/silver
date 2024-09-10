import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllWithOutMe(userId: number) {
    return this.prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
    });
  }

  async me(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}

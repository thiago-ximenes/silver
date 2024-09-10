import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [RolesResolver, RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { PermissionsGuard } from './permissions.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [PermissionsResolver, PermissionsService, PermissionsGuard],
  imports: [PrismaModule],
  exports: [PermissionsGuard],
})
export class PermissionsModule {}

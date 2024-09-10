import { SetMetadata } from '@nestjs/common';
import { PermissionEnum as PermissionEnum } from '../enums/permission.enum';

export const PERMISSION_KEY = 'permission';

export const Permission = (...permissions: Array<PermissionEnum>) =>
  SetMetadata(PERMISSION_KEY, permissions);

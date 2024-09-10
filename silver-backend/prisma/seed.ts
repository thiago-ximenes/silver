import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { PermissionEnum } from '../src/permissions/enums/permission.enum';

const prisma = new PrismaClient();

async function main() {
  const logger = new Logger('seed');
  const readPermission = await prisma.permission.upsert({
    where: { name: PermissionEnum.READ },
    update: {},
    create: { name: PermissionEnum.READ },
  });

  logger.log('Read permission created ' + JSON.stringify(readPermission));

  const createPermission = await prisma.permission.upsert({
    where: { name: PermissionEnum.CREATE },
    update: {},
    create: { name: PermissionEnum.CREATE },
  });

  logger.log('Create permission created ' + JSON.stringify(createPermission));

  const editPermission = await prisma.permission.upsert({
    where: { name: PermissionEnum.EDIT },
    update: {},
    create: { name: PermissionEnum.EDIT },
  });

  logger.log('Edit permission created ' + JSON.stringify(editPermission));

  const deletePermission = await prisma.permission.upsert({
    where: { name: PermissionEnum.DELETE },
    update: {},
    create: { name: PermissionEnum.DELETE },
  });

  logger.log('Delete permission created ' + JSON.stringify(deletePermission));

  const sharePermission = await prisma.permission.upsert({
    where: { name: PermissionEnum.SHARE },
    update: {},
    create: { name: PermissionEnum.SHARE },
  });

  logger.log('Share permission created ' + JSON.stringify(sharePermission));

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: createPermission.id },
          { id: editPermission.id },
          { id: deletePermission.id },
          { id: sharePermission.id },
        ],
      },
    },
    include: {
      permissions: true,
    },
  });

  logger.log('Admin role created ' + JSON.stringify(adminRole));

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      permissions: {
        connect: [{ id: readPermission.id }],
      },
    },
    include: {
      permissions: true,
    },
  });

  logger.log('User role created ' + JSON.stringify(userRole));

  const editorRole = await prisma.role.upsert({
    where: { name: 'editor' },
    update: {},
    create: {
      name: 'editor',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: createPermission.id },
          { id: editPermission.id },
        ],
      },
    },
    include: {
      permissions: true,
    },
  });

  logger.log('Editor role created ' + JSON.stringify(editorRole));

  const managerRole = await prisma.role.upsert({
    where: { name: 'manager' },
    update: {},
    create: {
      name: 'manager',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: createPermission.id },
          { id: editPermission.id },
          { id: deletePermission.id },
        ],
      },
    },
    include: {
      permissions: true,
    },
  });

  logger.log('Manager role created ' + JSON.stringify(managerRole));

  logger.log('Roles and permissions created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secretOrPrivateKey: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
    PrismaModule,
  ],
  providers: [AuthGuard, AuthService, AuthResolver],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}

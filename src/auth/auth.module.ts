import { Module }         from '@nestjs/common';
import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient }   from '@prisma/client';
import { UsersService }   from 'src/users/users.service';
import { TodosService }   from 'src/todos/todos.service';
import { JwtModule }      from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaClient,UsersService],
})
export class AuthModule {}

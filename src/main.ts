import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  // Application instance is created here
  const app = await NestFactory.create(AppModule);

  // Middleware goes here
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  // Application starts here
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { Body, Controller, Post }           from '@nestjs/common';
import { AuthService }                      from './auth.service';
import { RegisterUserDto, RegisterTodoDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUser')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('registerTodo')
  registerTodo(@Body() registerDto: RegisterTodoDto) {
    return this.authService.registerTodo(registerDto);
  }

  @Post('loginUser')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }
}

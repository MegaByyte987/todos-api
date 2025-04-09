import { Body, Controller, Get, Patch, Post, Req }           from '@nestjs/common';
import { AuthService }                      from './auth.service';
import { RegisterUserDto, RegisterTodoDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { Public } from 'src/helpers/public';
import { Payload } from 'src/interfaces/payload';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('registerUser')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Public()
  @Post('loginUser')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Get('profile')
  profile(@Req() req: Payload){
    return this.authService.profile(req.payload.user_id)
  }

  @Patch('profile')
  updateProfile(@Req() req: Payload, @Body() updateProfileDto: UpdateProfileDto){
    return this.authService.updateProfile(req.payload.user_id, updateProfileDto)
  }

}

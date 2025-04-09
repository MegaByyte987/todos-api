import { Injectable, NotFoundException, UnauthorizedException }                       from '@nestjs/common';
import { PrismaClient }                     from '@prisma/client';
import { UsersService }                     from 'src/users/users.service';
import { RegisterTodoDto, RegisterUserDto } from './dto/register.dto';
import { TodosService }                     from 'src/todos/todos.service';
import { JwtService }                       from '@nestjs/jwt';
import { LoginUserDto }                     from './dto/login.dto';
import { compare }                          from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaClient, private readonly usersService: UsersService,
        private readonly todosService: TodosService, private readonly jwtService: JwtService,
    ) {}

    async registerUser(registeruserDto: RegisterUserDto){
        const user = await this.usersService.create(registeruserDto);
        const token = await this.jwtService.signAsync(user);
        return { token };
    }

    async loginUser(loginUserDto: LoginUserDto){
        const user = await this.prisma.user.findFirst({
            where: {
                OR:[
                    {
                        email: loginUserDto.username,
                    },
                    {
                        mobile: loginUserDto.username,
                    },
                ],
            },
        });

        if(!user){
            throw new NotFoundException('Unable to find user');
        }

        const isPasswordValid = await compare(loginUserDto.password,user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid Password');
        }

        const token = await this.jwtService.signAsync(user);
        return { token };
    }

    async profile(user_id: number){
        return this.usersService.findOne(user_id)
    }

    async updateProfile(user_id:number, updateProfileDto: UpdateProfileDto){
        return this.usersService.update(user_id, updateProfileDto);
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createUserDto: CreateUserDto) {
    let user=await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if(user){
      throw new BadRequestException('This email is already registered');
    }

    user =await this.prisma.user.findUnique({
      where: {
        mobile: createUserDto.mobile,
      },
    });
    if(user){
      throw new BadRequestException('This mobile is already registered');
    }

    createUserDto.password = await hash(createUserDto.password,10); //hashes the password 10 times

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(user_id: number) {
    const user = await this.prisma.user.findUnique({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    let user: User | null;
    await this.findOne(user_id);

    if(updateUserDto.email){
      user = await this.prisma.user.findUnique({
        where: {email: updateUserDto.email},
      });

      if(user && user.user_id!=user_id){
        throw new BadRequestException('This email is already registered')
      }
    }

    if(updateUserDto.mobile){
      user = await this.prisma.user.findUnique({
        where: {mobile: updateUserDto.mobile},
      });

      if(user && user.user_id!=user_id){
        throw new BadRequestException('This mobile is already registered')
      }
    }

    if(updateUserDto.password){
      updateUserDto.password = await hash(updateUserDto.password,10);
    }

    return this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  async remove(user_id: number) {
    await this.findOne(user_id); 
    return this.prisma.user.delete({
      where: { user_id },
    });
  }
}
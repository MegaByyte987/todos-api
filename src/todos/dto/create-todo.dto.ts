import { IsBoolean, IsNotEmpty, isNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}

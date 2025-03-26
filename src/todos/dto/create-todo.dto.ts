import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
  @IsOptional()
  @IsNumber()
  user_id: number;

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

import { CreateTodoDto } from "src/todos/dto/create-todo.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class RegisterUserDto extends CreateUserDto{}
export class RegisterTodoDto extends CreateTodoDto{}
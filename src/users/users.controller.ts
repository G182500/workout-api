import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller("users")
// Todos os endpoints deste controller iniciam com "/users" obrigatoriamente
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(): string {
    return "usuario criado"
  }
}

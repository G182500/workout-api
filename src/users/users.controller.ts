import { Body, Controller, Get, Param, Patch, Post, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller("users")
// Todos os endpoints deste controller iniciam com "/users" obrigatoriamente
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // /users?limit=123&page=1    -> com pipe 'ParseInt' convertemos o valor string de @Query
  @Get()
  getAllUsers(@Query('limit', ParseIntPipe) limit: number) {
    //console.log(typeof limit);
    return this.usersService.findAll();
  }

  // /users/123
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): string {
    console.log(createUserDto);
    return "usuario criado";
  }

  /*@Put() // Put -> update completo
  createUser(@Body() body: any): string {
    return "usuario criado";
  }*/

  @Patch(':id') // Patch -> update parcial
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): string {
    return "usuario atualizado";
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return "usuario deletado";
  }
}

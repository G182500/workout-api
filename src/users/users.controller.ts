import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Todos os endpoints iniciam com "/users"
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // /users?limit=10&... -> Query('limit', ParseIntPipe) limit: number -> pipe para convertermos para number
  @Get()
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id') // /users/123
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /*@Put() // Put -> update completo
  createUser(@Body() body: any): string {
    return "usuario criado";
  }

  @Patch(':id') // Patch -> update parcial
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return 'usuario atualizado';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'usuario deletado';
  }*/
}

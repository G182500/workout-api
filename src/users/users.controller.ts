import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // /users?limit=10&... -> Query('limit', ParseIntPipe) limit: number -> pipe para convertermos para number
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req: any) {
    const userId = req.user?.id || 'aaa';
    return this.usersService.create(createUserDto, userId);
  }

  @Put(':id') // Put -> update completo
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.usersService.update(id, updateUserDto, userId);
  }

  @Patch(':id') // Patch -> update parcial
  patch(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.usersService.update(id, updateUserDto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.programsService.findAll(paginationDto);
  }

  @Get('user/:userId')
  findUserPrograms(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.programsService.findUserPrograms(userId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Post()
  create(@Body() createProgramDto: CreateProgramDto, @Request() req: any) {
    // TODO: Implementar autenticação para pegar o userId do token
    const userId = req.user?.id || 'aaa';
    return this.programsService.create(createProgramDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.programsService.update(id, updateProgramDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'aaa';
    return this.programsService.remove(id, userId);
  }
}

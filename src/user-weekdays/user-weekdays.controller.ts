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
import { UserWeekdaysService } from './user-weekdays.service';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateUserWeekdayDto } from './dto/create-user-weekday.dto';
import { UpdateUserWeekdayDto } from './dto/update-user-weekday.dto';

@Controller('user-weekdays')
export class UserWeekdaysController {
  constructor(private readonly userWeekdaysService: UserWeekdaysService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userWeekdaysService.findAll(paginationDto);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.userWeekdaysService.findByUser(userId, paginationDto);
  }

  @Get('program/:programId')
  findByProgram(
    @Param('programId') programId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.userWeekdaysService.findByProgram(programId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWeekdaysService.findOne(id);
  }

  @Post()
  create(
    @Body() createUserWeekdayDto: CreateUserWeekdayDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.userWeekdaysService.create(createUserWeekdayDto, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserWeekdayDto: UpdateUserWeekdayDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.userWeekdaysService.update(id, updateUserWeekdayDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'aaa';
    return this.userWeekdaysService.remove(id, userId);
  }
}

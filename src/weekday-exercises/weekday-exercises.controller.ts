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
import { WeekdayExercisesService } from './weekday-exercises.service';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateWeekdayExerciseDto } from './dto/create-weekday-exercise.dto';
import { UpdateWeekdayExerciseDto } from './dto/update-weekday-exercise.dto';

@Controller('weekday-exercises')
export class WeekdayExercisesController {
  constructor(
    private readonly weekdayExercisesService: WeekdayExercisesService,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.weekdayExercisesService.findAll(paginationDto);
  }

  @Get('user-weekday/:userWeekdayId')
  findByUserWeekday(
    @Param('userWeekdayId') userWeekdayId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.weekdayExercisesService.findByUserWeekday(
      userWeekdayId,
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekdayExercisesService.findOne(id);
  }

  @Post()
  create(
    @Body() createWeekdayExerciseDto: CreateWeekdayExerciseDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.weekdayExercisesService.create(
      createWeekdayExerciseDto,
      userId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWeekdayExerciseDto: UpdateWeekdayExerciseDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 'aaa';
    return this.weekdayExercisesService.update(
      id,
      updateWeekdayExerciseDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || 'aaa';
    return this.weekdayExercisesService.remove(id, userId);
  }
}

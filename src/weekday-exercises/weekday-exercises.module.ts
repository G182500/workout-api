import { Module } from '@nestjs/common';
import { WeekdayExercisesService } from './weekday-exercises.service';
import { WeekdayExercisesController } from './weekday-exercises.controller';

@Module({
  controllers: [WeekdayExercisesController],
  providers: [WeekdayExercisesService],
})
export class WeekdayExercisesModule {}

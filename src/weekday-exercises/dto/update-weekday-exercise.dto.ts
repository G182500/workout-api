import { PartialType } from '@nestjs/mapped-types';
import { CreateWeekdayExerciseDto } from './create-weekday-exercise.dto';

export class UpdateWeekdayExerciseDto extends PartialType(
  CreateWeekdayExerciseDto,
) {}

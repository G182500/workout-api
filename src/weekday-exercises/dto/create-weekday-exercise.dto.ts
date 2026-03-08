import { IsInt, IsUUID, IsOptional, IsJSON } from 'class-validator';
import { Type } from 'class-transformer';

export class SetDto {
  @IsInt()
  setsNumber: number;

  @IsInt()
  reps: number;

  @IsInt()
  weight: number;
}

export class CreateWeekdayExerciseDto {
  @IsInt()
  order: number;

  @IsUUID()
  userWeekdaysId: string;

  @IsUUID()
  exerciseId: string;

  @IsOptional()
  @IsJSON()
  //@ValidateNested({ each: true })
  @Type(() => SetDto)
  sets?: SetDto;
}

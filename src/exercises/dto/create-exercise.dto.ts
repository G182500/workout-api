import { IsString, IsEnum, IsOptional } from 'class-validator';
import { musclesEnum } from 'utils/muscles';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsEnum(musclesEnum)
  targetMuscle: (typeof musclesEnum)[number];

  @IsOptional()
  @IsString()
  imagePath?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}

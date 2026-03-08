import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { goalOptions } from 'src/db/schema/programs';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsEnum(goalOptions)
  goal: (typeof goalOptions)[number];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

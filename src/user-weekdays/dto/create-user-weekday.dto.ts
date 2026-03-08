import { IsInt, IsString, IsOptional, IsUUID, Min, Max } from 'class-validator';

export class CreateUserWeekdayDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayIndex: number;

  @IsString()
  imagePath: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  programId?: string;

  @IsUUID()
  userId: string;
}

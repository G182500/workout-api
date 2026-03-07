import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  email: string;

  @IsDate()
  birthDate: string;

  @IsNumber()
  @Type(() => Number)
  height: number;

  @IsNumber()
  @Type(() => Number)
  weight: number;
}

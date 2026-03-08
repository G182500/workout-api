import { PartialType } from '@nestjs/mapped-types';
import { CreateUserWeekdayDto } from './create-user-weekday.dto';

export class UpdateUserWeekdayDto extends PartialType(CreateUserWeekdayDto) {}

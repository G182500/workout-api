import { Module } from '@nestjs/common';
import { UserWeekdaysService } from './user-weekdays.service';
import { UserWeekdaysController } from './user-weekdays.controller';

@Module({
  controllers: [UserWeekdaysController],
  providers: [UserWeekdaysService],
})
export class UserWeekdaysModule {}

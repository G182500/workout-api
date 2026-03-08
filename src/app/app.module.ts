import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { ProgramsModule } from 'src/programs/programs.module';
import { UserWeekdaysModule } from 'src/user-weekdays/user-weekdays.module';
import { WeekdayExercisesModule } from 'src/weekday-exercises/weekday-exercises.module';

// decorator que torna a classe um modulo
@Module({
  // para ser mapeado pelo projeto, as classes devem ser importadas no modulo principal
  imports: [
    UsersModule,
    ExercisesModule,
    ProgramsModule,
    UserWeekdaysModule,
    WeekdayExercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// comando para agilizar a criacao (nest --help): nest generate module nome_modulo

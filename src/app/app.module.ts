import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';

// decorator que torna a classe um modulo
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
// para ser mapeado pelo projeto, a classe deve ser importada no modulo principal

export class AppModule { }
// comando para agilizar a criacao (nest --help): nest generate module nome_modulo

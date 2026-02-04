import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
  app.module.ts     -> Modulo principal do app
  app.controller.ts -> Define endpoints e lida com as requisicoes
  app.service.ts    -> Deve ter toda a logica de negocio (separado do controller)
*/

// inicia o projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // necessario para utilizar Pipes (install class-validator and class-transformer packages is required)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignorar propriedades da requisicao que nao fazem parte do DTO (atributos sem decorators)
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

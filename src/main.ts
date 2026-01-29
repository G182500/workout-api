import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/*
  app.module.ts     -> Modulo principal do app
  app.controller.ts -> Define endpoints e lida com as requisicoes
  app.service.ts    -> Deve ter toda a logica de negocio (separado do controller)
*/

// inicia o projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

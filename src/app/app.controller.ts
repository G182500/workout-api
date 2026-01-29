import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  // O constructor é chamado automaticamente pelo NestJS quando o controller é instanciado.
  // O AppService é injetado via Dependency Injection:
  // o Nest cria (ou reutiliza) uma instância de AppService,
  // chama seu constructor e a disponibiliza em this.appService.
  // O readonly impede que essa dependência seja reatribuída.

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

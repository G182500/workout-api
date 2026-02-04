// DTO -> Data Transfer Object (padrao usado para validar/transformar dados)

import { IsNotEmpty, IsString, MinLength } from "class-validator";

// Um atributo desta classe DTO sem decorator nao valida nada, serve apenas de tipagem
// os decorators de class-validator que validam e retornam erros para a requisicao

export class CreateUserDto {
  @IsString({ message: 'name precisa ser um texto' })
  @MinLength(5, { message: 'name deve ter no minimo 5 caracteres' })
  //@IsNotEmpty() unnecessary
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
// DTO -> Data Transfer Object (padrao usado para validar/transformar dados)

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

// Um atributo desta classe DTO sem decorator nao valida nada, serve apenas de tipagem
// os decorators de class-validator que validam e retornam erros para a requisicao

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(50)
  @Type(() => Number) // Tenta entregar o valor ja convertido
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number;
}

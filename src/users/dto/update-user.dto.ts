import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional } from "class-validator";

// Com o pacote '@nestjs/mapped-types' otimizamos o codigo,
// criando uma classe DTO que eh uma versao parcial de outra

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  @IsOptional()
  readonly activate?: boolean;
}
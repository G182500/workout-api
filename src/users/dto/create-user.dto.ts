// DTO -> Data Transfer Object (usado para validar/transformar dados)

export class CreateUserDto {
  readonly name: string;
  readonly description: string;
}
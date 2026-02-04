import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return [
      {
        id: '123', name: "gabriel santos bueno"
      },
      {
        id: '456', name: "Astolfo Bueno Santos"
      }
    ];
  }

  findOne(id: string) {
    //throw new HttpException('mensagem aqui', HttpStatus.BAD_REQUEST)

    return {
      id: '123', name: "gabriel santos bueno"
    }
  }
}

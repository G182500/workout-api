import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return [
      {
        id: '123', name: "gabriel santos bueno"
      }
    ];
  }
}

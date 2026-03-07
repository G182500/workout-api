import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { db } from 'src/db/pool-conection';
import { users } from 'src/db/schema/users';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async findAll(pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(users)
      .limit(limit)
      .offset(offset)
      .orderBy(users.name);

    return await query;
  }

  async findOne(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await db
      .insert(users)
      .values({ ...createUserDto, createdAt: new Date(), createdBy: 'aaa' })
      .returning();
  }
}

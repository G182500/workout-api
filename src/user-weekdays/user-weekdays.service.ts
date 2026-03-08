import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/pool-conection';
import { userWeekdays } from 'src/db/schema/user-weekdays';
import { eq, isNull } from 'drizzle-orm';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateUserWeekdayDto } from './dto/create-user-weekday.dto';
import { UpdateUserWeekdayDto } from './dto/update-user-weekday.dto';

@Injectable()
export class UserWeekdaysService {
  async findAll(pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(userWeekdays)
      .where(isNull(userWeekdays.deletedAt))
      .limit(limit)
      .offset(offset)
      .orderBy(userWeekdays.dayIndex);

    return await query;
  }

  async findByUser(userId: string, pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(userWeekdays)
      .where(eq(userWeekdays.userId, userId))
      .limit(limit)
      .offset(offset)
      .orderBy(userWeekdays.dayIndex);

    return await query;
  }

  async findByProgram(programId: string, pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(userWeekdays)
      .where(eq(userWeekdays.programId, programId))
      .limit(limit)
      .offset(offset)
      .orderBy(userWeekdays.dayIndex);

    return await query;
  }

  async findOne(id: string) {
    const [userWeekday] = await db
      .select()
      .from(userWeekdays)
      .where(eq(userWeekdays.id, id))
      .limit(1);

    if (!userWeekday)
      throw new HttpException(
        'Dia da semana não encontrado',
        HttpStatus.NOT_FOUND,
      );

    return userWeekday;
  }

  async create(createUserWeekdayDto: CreateUserWeekdayDto, userId: string) {
    const [newUserWeekday] = await db
      .insert(userWeekdays)
      .values({
        ...createUserWeekdayDto,
        createdAt: new Date(),
        createdBy: userId,
      })
      .returning();

    return newUserWeekday;
  }

  async update(
    id: string,
    updateUserWeekdayDto: UpdateUserWeekdayDto,
    userId: string,
  ) {
    await this.findOne(id);

    const [updatedUserWeekday] = await db
      .update(userWeekdays)
      .set({
        ...updateUserWeekdayDto,
        updatedAt: new Date(),
        updatedBy: userId,
      })
      .where(eq(userWeekdays.id, id))
      .returning();

    return updatedUserWeekday;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id);

    await db
      .update(userWeekdays)
      .set({
        deletedAt: new Date(),
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(eq(userWeekdays.id, id))
      .returning();

    return { message: 'Dia da semana deletado com sucesso' };
  }
}

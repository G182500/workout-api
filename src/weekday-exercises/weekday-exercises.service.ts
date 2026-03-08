import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/pool-conection';
import { weekdayExercises } from 'src/db/schema/weekday-exercises';
import { eq, isNull } from 'drizzle-orm';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateWeekdayExerciseDto } from './dto/create-weekday-exercise.dto';
import { UpdateWeekdayExerciseDto } from './dto/update-weekday-exercise.dto';

@Injectable()
export class WeekdayExercisesService {
  async findAll(pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(weekdayExercises)
      .where(isNull(weekdayExercises.deletedAt))
      .limit(limit)
      .offset(offset)
      .orderBy(weekdayExercises.order);

    return await query;
  }

  async findByUserWeekday(userWeekdaysId: string, pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(weekdayExercises)
      .where(eq(weekdayExercises.userWeekdaysId, userWeekdaysId))
      .limit(limit)
      .offset(offset)
      .orderBy(weekdayExercises.order);

    return await query;
  }

  async findOne(id: string) {
    const [exercise] = await db
      .select()
      .from(weekdayExercises)
      .where(eq(weekdayExercises.id, id))
      .limit(1);

    if (!exercise)
      throw new HttpException(
        'Exercício do dia não encontrado',
        HttpStatus.NOT_FOUND,
      );

    return exercise;
  }

  async create(
    createWeekdayExerciseDto: CreateWeekdayExerciseDto,
    userId: string,
  ) {
    const result = await db
      .insert(weekdayExercises)
      .values({
        ...createWeekdayExerciseDto,
        createdAt: new Date(),
        createdBy: userId,
      })
      .returning();

    return result[0];
  }

  async update(
    id: string,
    updateWeekdayExerciseDto: UpdateWeekdayExerciseDto,
    userId: string,
  ) {
    await this.findOne(id);

    const updateData: any = {};

    if (updateWeekdayExerciseDto.order !== undefined) {
      updateData.order = updateWeekdayExerciseDto.order;
    }
    if (updateWeekdayExerciseDto.sets !== undefined) {
      updateData.sets = updateWeekdayExerciseDto.sets;
    }
    if (updateWeekdayExerciseDto.userWeekdaysId !== undefined) {
      updateData.userWeekdaysId = updateWeekdayExerciseDto.userWeekdaysId;
    }
    if (updateWeekdayExerciseDto.exerciseId !== undefined) {
      updateData.exerciseId = updateWeekdayExerciseDto.exerciseId;
    }

    updateData.updatedAt = new Date();
    updateData.updatedBy = userId;

    const result = await db
      .update(weekdayExercises)
      .set(updateData)
      .where(eq(weekdayExercises.id, id))
      .returning();

    return result[0];
  }

  async remove(id: string, userId: string) {
    await this.findOne(id);

    const [exercise] = await db
      .update(weekdayExercises)
      .set({
        deletedAt: new Date(),
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(eq(weekdayExercises.id, id))
      .returning();

    return exercise;
  }
}

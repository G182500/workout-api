import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/pool-conection';
import { exercises } from 'src/db/schema/exercises';
import { eq } from 'drizzle-orm';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  async findAll(pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(exercises)
      .limit(limit)
      .offset(offset)
      .orderBy(exercises.name);

    return await query;
  }

  async findOne(id: string) {
    const [exercise] = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, id))
      .limit(1);

    if (!exercise)
      throw new HttpException('Exercício não encontrado', HttpStatus.NOT_FOUND);

    return exercise;
  }

  async create(createExerciseDto: CreateExerciseDto) {
    const [newExercise] = await db
      .insert(exercises)
      .values(createExerciseDto)
      .returning();

    return newExercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    await this.findOne(id);

    const [updatedExercise] = await db
      .update(exercises)
      .set(updateExerciseDto)
      .where(eq(exercises.id, id))
      .returning();

    return updatedExercise;
  }

  async remove(id: string) {
    await this.findOne(id);

    await db.delete(exercises).where(eq(exercises.id, id));
    return { message: 'Exercício deletado com sucesso' };
  }
}

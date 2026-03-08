import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/pool-conection';
import { programs } from 'src/db/schema/programs';
import { eq, isNull } from 'drizzle-orm';
import { PaginationDto } from 'src/commom/dto/pagination.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  async findAll(pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(programs)
      .where(isNull(programs.deletedAt))
      .limit(limit)
      .offset(offset)
      .orderBy(programs.createdAt);

    return await query;
  }

  async findUserPrograms(userId: string, pagination?: PaginationDto) {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;

    const query = db
      .select()
      .from(programs)
      .where(eq(programs.userId, userId))
      .limit(limit)
      .offset(offset)
      .orderBy(programs.createdAt);

    return await query;
  }

  async findOne(id: string) {
    const [currentProgram] = await db
      .select()
      .from(programs)
      .where(eq(programs.id, id))
      .limit(1);

    if (!currentProgram)
      throw new HttpException('Programa não encontrado', HttpStatus.NOT_FOUND);

    return currentProgram;
  }

  async create(createProgramDto: CreateProgramDto, userId: string) {
    const [newProgram] = await db
      .insert(programs)
      .values({
        ...createProgramDto,
        createdAt: new Date(),
        createdBy: userId,
      })
      .returning();

    return newProgram;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto, userId: string) {
    await this.findOne(id);

    const [updatedProgram] = await db
      .update(programs)
      .set({
        ...updateProgramDto,
        updatedAt: new Date(),
        updatedBy: userId,
      })
      .where(eq(programs.id, id))
      .returning();

    return updatedProgram;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id);

    await db
      .update(programs)
      .set({
        deletedAt: new Date(),
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(eq(programs.id, id));

    return { message: 'Programa deletado com sucesso' };
  }
}

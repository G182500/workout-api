import { musclesEnum } from "utils/muscles";
import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const pgMusclesEnum = pgEnum("muscle", musclesEnum);

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  targetMuscle: pgMusclesEnum("target_muscle").notNull(),
  imagePath: varchar("image_path", { length: 255 }),
  instructions: text("instructions"),
});
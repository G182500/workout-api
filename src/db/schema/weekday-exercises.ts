import { integer, jsonb, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { exercises } from "./exercises";
import { userWeekdays } from "./user-weekdays";

interface ISet {
  setsNumber: number,
  reps: number,
  weight: number,
};

export const weekdayExercises = pgTable("weekday_exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  order: integer("order").notNull(),
  userWeekdaysId: uuid("user_weekdays_id").notNull(),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id),
  sets: jsonb("sets").$type<ISet>(),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: uuid("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const weekdayExercisesRelations = relations(weekdayExercises, ({ one }) => ({
  userWeekday: one(userWeekdays, {
    fields: [weekdayExercises.userWeekdaysId],
    references: [userWeekdays.id],
  }),
  exercise: one(exercises, {
    fields: [weekdayExercises.exerciseId],
    references: [exercises.id],
  }),
  createdBy: one(users, {
    fields: [weekdayExercises.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [weekdayExercises.updatedBy],
    references: [users.id],
  }),
}));
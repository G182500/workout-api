import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { weekdayExercises } from "./weekday-exercises";
import { programs } from "./programs";

export const userWeekdays = pgTable("user_weekdays", {
  id: uuid("id").defaultRandom().primaryKey(),
  dayIndex: integer("day_index").notNull(),
  imagePath: varchar("image_path", { length: 255 }).notNull(),
  description: text("description").notNull(),
  programId: uuid("program_id").references(() => programs.id),
  userId: uuid("user_id").notNull().references(() => users.id),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: uuid("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const userWeekdaysRelations = relations(userWeekdays, ({ one, many }) => ({
  weekdayExercises: many(weekdayExercises, { relationName: "user_weekday_exercises" }),
  user: one(users, {
    fields: [userWeekdays.userId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [userWeekdays.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [userWeekdays.updatedBy],
    references: [users.id],
  }),
}));
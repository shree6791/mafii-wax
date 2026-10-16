import { pgTable, text, timestamp, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const appointmentRequests = pgTable("appointment_requests", {
  reference: text("reference").primaryKey(),
  serviceId: text("service_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  preferredDate: date("preferred_date", { mode: "string" }).notNull(),
  preferredTime: text("preferred_time").notNull(),
  consent: boolean("consent").notNull(),
  source: text("source").notNull().default("direct"),
  status: text("status").notNull().default("preview_request"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
export const insertAppointmentRequestSchema = createInsertSchema(appointmentRequests);
export type AppointmentRequest = typeof appointmentRequests.$inferSelect;

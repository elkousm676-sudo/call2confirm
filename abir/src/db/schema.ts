import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const contactLeads = pgTable("contact_leads", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  activity: varchar("activity", { length: 80 }).notNull(),
  volume: varchar("volume", { length: 80 }).notNull(),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  source: varchar("source", { length: 80 }).notNull().default("website"),
  userAgent: text("user_agent"),
  ipHash: varchar("ip_hash", { length: 128 }),
  notified: boolean("notified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ContactLead = typeof contactLeads.$inferSelect;
export type NewContactLead = typeof contactLeads.$inferInsert;

import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bids = pgTable("nla_bids", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});
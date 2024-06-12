import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable('nla_bids', {
  id: serial("id").primaryKey()
})
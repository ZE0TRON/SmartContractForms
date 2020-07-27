import { Client } from "https://deno.land/x/postgres/mod.ts";

import { clearDB } from "../src/utils/db.ts";

export default async function teardown(db: Client) {
  await clearDB(db);
}

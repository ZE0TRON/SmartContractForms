import { Client } from "https://deno.land/x/postgres/mod.ts";

import { clearDB, initDB } from "../src/utils/db.ts";
import * as DataQueries from "./data/dummyDataQueries.ts";

const populateWithDummyData = async (client: Client) => {
  await client.query(DataQueries.POPULATE_USERS_QUERY);
  await client.query(DataQueries.POPULATE_FORMS_QUERY);
  await client.query(DataQueries.POPULATE_INTEGRATIONS_QUERY);
  await client.query(DataQueries.POPULATE_MATCHINGS_QUERY);
};
export default async function setup(db: Client) {
  await clearDB(db);
  await initDB(db);
  await populateWithDummyData(db);
}

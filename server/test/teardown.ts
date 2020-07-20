import { clearDB, disconnectFromDB } from "../src/utils/db.ts";

// TODO modify this when test env set use test db
export default async function teardown() {
  await clearDB();
  await disconnectFromDB();
}

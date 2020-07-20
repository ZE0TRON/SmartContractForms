import { clearDB, initDB, connectToDB } from "../src/utils/db.ts";

// TODO modify this when test env set use test db
export default async function setup() {
  await connectToDB();
  await clearDB();
  await initDB();
}

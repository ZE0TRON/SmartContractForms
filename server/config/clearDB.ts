import { connectToDB, disconnectFromDB, clearDB } from "../src/utils/db.ts";

await connectToDB();
await clearDB();
await disconnectFromDB();

import { initDB, connectToDB, disconnectFromDB } from "../src/utils/db.ts";

await connectToDB();
await initDB();
await disconnectFromDB();

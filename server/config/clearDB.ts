import { connectToDB, disconnectFromDB, clearDB } from "../src/utils/db.ts";

const client = await connectToDB();
await clearDB(client);
await disconnectFromDB(client);

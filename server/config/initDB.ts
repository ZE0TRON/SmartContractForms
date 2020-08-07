import { initDB, connectToDB, disconnectFromDB } from "../src/utils/db.ts";

const client = await connectToDB();
await initDB(client);
await disconnectFromDB(client);

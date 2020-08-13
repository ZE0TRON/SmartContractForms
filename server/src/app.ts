import { Application } from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { connectToDB, disconnectFromDB } from "./utils/db.ts";
import router from "./routers/index.ts";

// Global db connection
declare global {
  var db: Client;
  interface Window {
    db: Client;
  }
}

const app = new Application();

const sigterm = Deno.signals.terminate();
const sigint = Deno.signals.interrupt();
let client: Client;
const cleanUpAndExit = async () => {
  console.log("Cleaning up");
  if (window.db) {
    await disconnectFromDB(client);
  }
  Deno.exit(1);
};

try {
  const client = await connectToDB();
  window.db = client;
  sigterm.then(cleanUpAndExit);
  sigint.then(cleanUpAndExit);
} catch (err) {
  console.log("DB error : ", err);
}
try {
  //TODO set proper cors
  app.use(oakCors());
  app.use(router.routes());
  app.use(router.allowedMethods());
  await app.listen({ port: 8000 });
} catch (err) {
  console.log("Unhandled Error closing the app error : ", err);
  await cleanUpAndExit();
}

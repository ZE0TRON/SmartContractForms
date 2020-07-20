import { Application } from "https://deno.land/x/oak/mod.ts";
import { connectToDB, disconnectFromDB } from "./utils/db.ts";
import router from "./routers/index.ts";

const app = new Application();

const sigterm = Deno.signals.terminate();
const sigint = Deno.signals.interrupt();

const cleanUpAndExit = async () => {
  console.log("Cleaning up");
  await disconnectFromDB();
  Deno.exit(1);
};

try {
  await connectToDB();
  sigterm.then(cleanUpAndExit);
  sigint.then(cleanUpAndExit);
} catch (err) {
  console.log("DB error : ", err);
}
try {
  app.use(router.routes());
  app.use(router.allowedMethods());
  await app.listen({ port: 8000 });
} catch (err) {
  console.log("Unhandled Error closing the app error : ", err);
  await cleanUpAndExit();
}

import {
  assert,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";

Deno.test("Create User", async () => {
  await setup();
  await db.addUser("cmpbilge@gmail.com", "hash");
  const users = await db.getUserByEmail("cmpbilge@gmail.com");
  assert(users && typeof users !== "undefined");
  assertNotEquals(users.length, 0);
  assertEquals(users[0][1], "cmpbilge@gmail.com");
  await teardown();
});

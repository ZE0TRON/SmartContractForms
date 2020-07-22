import { Rhum } from "https://deno.land/x/rhum@v1.0.1/mod.ts";

import {
  assert,
  assertEquals,
  assertNotEquals
} from "https://deno.land/std/testing/asserts.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";

Rhum.testPlan("utils/db.ts", () => {
  Rhum.testSuite("User TXs", () => {
    Rhum.testCase("addUser(),getUserByEmail()", async () => {
      await setup();
      await db.addUser("cmpbilge@gmail.com", "hash");
      const users = await db.getUserByEmail("cmpbilge@gmail.com");
      assert(users && typeof users !== "undefined");
      assertNotEquals(users.length, 0);
      assertEquals(users[0][1], "cmpbilge@gmail.com");
      await teardown();
    });
  });
  Rhum.testSuite("close()", () => {
    Rhum.testCase("Returns true", async () => {
      const result = await close();
      Rhum.asserts.assertEquals(true, result);
    });
  });
  Rhum.testSuite("Form TXs", () => {
    Rhum.testCase("addForm(),getFormsOfUser()", async() =>);
  });
});

Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`
Deno.test("DB - Create User", async () => {});

Deno.test("DB - Create Form", async () => {
  await setup();
  await db.addForm(1, 2, "<html>");
  const forms = await db.getFormsOfUser(2);
  assert(forms && typeof forms !== "undefined");
  assertNotEquals(forms.length, 0);
  // TODO check other fields ?
  assertEquals(forms[0][3], "<html>");
  await teardown();
});

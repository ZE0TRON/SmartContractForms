import { Rhum } from "https://deno.land/x/rhum@v1.1.2/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";
import Account from "../src/models/account.ts";
const { assert, assertEquals, assertNotEquals } = Rhum.asserts;

Rhum.testPlan("models/account.ts", () => {
  let client: Client;
  let user: Account | null;
  Rhum.beforeAll(async () => {
    client = await db.connectToDB();
  });
  Rhum.afterAll(async () => {
    await db.disconnectFromDB(client);
  });
  Rhum.testSuite("Should setup test", async () => {
    Rhum.testCase("db setup", async () => {
      await setup(client);
    });
  });
  Rhum.testSuite("createAccount(),getByEmail()", () => {
    Rhum.testCase("create shouldn't throw err", async () => {
      const createdUser = await Account.createAccount(
        client,
        "test1@gmail.com",
        "secretpassword"
      );
    });

    Rhum.testCase("getByEmail shouldn't throw err", async () => {
      user = await Account.getByEmail(client, "test1@gmail.com");
    });

    Rhum.testCase("user should be found", () => {
      assert(user && typeof user !== "undefined");
    });

    Rhum.testCase("value types should be correct", () => {
      assertEquals(typeof user?.account_id, "number");
      assertEquals(typeof user?.password, "string");
      assertEquals(typeof user?.sessionID, "string");
    });

    Rhum.testCase("sessionID should be valid", () => {
      assert(((user?.sessionID && user.sessionID?.length) || 0) > 0);
    });

    Rhum.testCase("emails should match", () => {
      assertEquals(user ? user.email : "", "test1@gmail.com");
    });
  });

  Rhum.testSuite("verifyPassword()", async () => {
    Rhum.testCase("true password must match", async () => {
      assertEquals(await user?.verifyPassword("secretpassword"), true);
    });
    Rhum.testCase("wrong password should'nt match", async () => {
      assertEquals(await user?.verifyPassword("secetpassword"), false);
    });
  });
  Rhum.testSuite("Should teardown test", async () => {
    Rhum.testCase("db teardown", async () => {
      await teardown(client);
    });
  });
});
Rhum.run();

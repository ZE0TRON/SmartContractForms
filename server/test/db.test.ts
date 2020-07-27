import { Rhum } from "../lib/rhum/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";
import Integration from "../src/models/integration.ts";
import Account from "../src/models/account.ts";
import Form from "../src/models/form.ts";
import { abi, address } from "./data/contract.ts";
import { url } from "./data/form.ts";
// TODO setup with queries
Rhum.testPlan("utils/db.ts", () => {
  let client: Client;
  Rhum.beforeAll(async () => {
    client = await db.connectToDB();
    await setup(client);
  });
  Rhum.afterAll(async () => {
    await teardown(client);
    await db.disconnectFromDB(client);
  });
  Rhum.testSuite("User TXs", () => {
    Rhum.testCase("addUser(),getUserByEmail()", async () => {
      const user = new Account("cmpbilge@gmail.com", "hash", null);
      const userID = await db.addUser(client, user);
      const users = await db.getUserByEmail(client, "cmpbilge@gmail.com");
      assert(users && typeof users !== "undefined");
      assertNotEquals(users.length, 0);
      //assertEquals(users[0][0], userID);
      assertEquals(users[0][1], "cmpbilge@gmail.com");
    });
  });
  Rhum.testSuite("Form TXs", () => {
    Rhum.testCase("addForm(),getFormsOfUser()", async () => {
      const form = new Form(1, 6, "<html>");
      const formID = await db.addForm(client, form);
      const forms = await db.getFormsOfUser(client, 6);
      console.log(forms[0]);
      assert(forms && typeof forms !== "undefined");
      assertNotEquals(forms.length, 0);
      assertEquals(forms[0][0], formID);
      assertEquals(forms[0][3], "<html>");
    });
  });

  Rhum.testSuite("Integration TXs", () => {
    Rhum.testCase("addIntegration(),getIntegrationByID()", async () => {
      //  (user_id,contract_address,contract_abi,contract_method,form_url)
      const integration = new Integration(1, address, abi, "newMessage");
      const integrationID = await db.addIntegration(client, integration);
      const retrievedIntegration = await db.getIntegrationByID(
        client,
        integrationID
      );
      assert(
        retrievedIntegration && typeof retrievedIntegration !== "undefined"
      );
      assertNotEquals(retrievedIntegration.length, 0);
      assertEquals(retrievedIntegration[0][0], integrationID);
      assertEquals(retrievedIntegration[0][3], abi);
    });
  });

  Rhum.testSuite("Matching TXs", () => {
    Rhum.testCase("addMatching(),getMatchingByIntegrationID()", async () => {});
  });
});

Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`

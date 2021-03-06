import { Rhum } from "https://deno.land/x/rhum@v1.1.2/mod.ts";

import { Client } from "https://deno.land/x/postgres/mod.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";
import Integration from "../src/models/integration.ts";
import Account from "../src/models/account.ts";
import Form from "../src/models/form.ts";
import Matching from "../src/models/matching.ts";
import { abi, address } from "./data/contract.ts";
const { assert, assertEquals, assertNotEquals } = Rhum.asserts;

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
      const dbUser = await db.getUserByEmail(client, "cmpbilge@gmail.com");
      assert(dbUser && typeof dbUser !== "undefined");
      //assertEquals(users[0][0], userID);
      assertEquals(dbUser[1], "cmpbilge@gmail.com");
    });
  });
  Rhum.testSuite("Form TXs", () => {
    Rhum.testCase("addForm(),getFormsOfUser()", async () => {
      const form = new Form(1, 6, "<html>", "token form");
      const formID = await db.addForm(client, form);
      const forms = await db.getFormsOfUser(client, 6);
      assert(forms && typeof forms !== "undefined");
      assertNotEquals(forms.length, 0);
      assertEquals(forms[0][0], formID);
      assertEquals(forms[0][3], "<html>");
      assertEquals(forms[0][4], "token form");
    });
  });

  Rhum.testSuite("Integration TXs", () => {
    Rhum.testCase("addIntegration(),getIntegrationByID()", async () => {
      //  (user_id,contract_address,contract_abi,contract_method,form_url)
      const integration = new Integration(1, address, abi, "newMessage", "url");
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
    Rhum.testCase("addMatching(),getMatchingByIntegrationID()", async () => {
      const matching = new Matching(1, "user_name", "userName");
      const matchingID = await db.addMatching(client, matching);
      const retrievedMatching = await db.getMatchingByID(client, matchingID);

      assert(retrievedMatching && typeof retrievedMatching !== "undefined");
      assertNotEquals(retrievedMatching.length, 0);
      assertEquals(retrievedMatching[0][0], matchingID);
      assertEquals(retrievedMatching[0][2], "user_name");
    });
  });
});

Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`

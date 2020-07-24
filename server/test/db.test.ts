import { Rhum } from "https://deno.land/x/rhum@v1.0.1/mod.ts";

import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import * as db from "../src/utils/db.ts";
import setup from "./setup.ts";
import teardown from "./teardown.ts";
import Integration from "../src/models/integration.ts";
import { abi, address } from "./data/contract.ts";
import { url } from "./data/form.ts";

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
  Rhum.testSuite("Form TXs", () => {
    Rhum.testCase("addForm(),getFormsOfUser()", async () => {
      await setup();
      await db.addForm(1, 2, "<html>");
      const forms = await db.getFormsOfUser(2);
      assert(forms && typeof forms !== "undefined");
      assertNotEquals(forms.length, 0);
      // TODO check other fields ?
      assertEquals(forms[0][3], "<html>");
      await teardown();
    });
  });

  Rhum.testSuite("Integration TXs", () => {
    Rhum.testCase("addIntegration(),getIntegrationByID()", async () => {
      await setup();
      //  (user_id,contract_address,contract_abi,contract_method,form_url)
      const integration = new Integration(1, address, abi, "newMessage", url);
      db.addIntegration(integration);
      const retrievedIntegration = await db.getIntegrationByID(1);
      assert(
        retrievedIntegration && typeof retrievedIntegration !== "undefined"
      );
      //console.log(retrievedIntegration);
      assertNotEquals(retrievedIntegration.length, 0);
      assertEquals(retrievedIntegration[0][3], abi);
      await teardown();
    });
  });

  Rhum.testSuite("Matching TXs", () => {
    Rhum.testCase("addMatching(),getMatchingByIntegrationID()", async () => {
      await setup();
    });
  });
});

Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`

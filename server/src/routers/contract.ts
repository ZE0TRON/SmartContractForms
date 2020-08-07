import { Router } from "https://deno.land/x/oak/mod.ts";

import * as FormController from "../controllers/form.ts";
import { validateUser } from "../controllers/account.ts";

const SUB_ROUTE = "/form";

const withContractRoutes = (router: Router) => {
  router
    .post(SUB_ROUTE + "/new", validateUser, FormController.createForm)
    .get(SUB_ROUTE + "/current", ({ request, response, cookies }) => {
      response.body = "ERC20 ?";
    });
};

export default withContractRoutes;

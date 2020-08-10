import { Router } from "https://deno.land/x/oak/mod.ts";

import * as FormController from "../controllers/form.ts";
import { validateUser } from "../controllers/account.ts";

const SUB_ROUTE = "/form";

const withFormRoutes = (router: Router) => {
  router.post(SUB_ROUTE + "/new", validateUser, FormController.createForm);
};

export default withFormRoutes;

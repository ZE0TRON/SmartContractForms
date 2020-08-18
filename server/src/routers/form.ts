import { Router } from "https://deno.land/x/oak/mod.ts";

import * as FormController from "../controllers/form.ts";
import { validateUser } from "../controllers/account.ts";

const SUB_ROUTE = "/form";

const withFormRoutes = (router: Router) => {
  router
    .post(SUB_ROUTE + "/new", validateUser, FormController.createForm)
    .get(SUB_ROUTE + "/:id", FormController.getForm)
    .get(SUB_ROUTE + "/list", validateUser, FormController.listUserForms);
};

export default withFormRoutes;

import { Router } from "https://deno.land/x/oak/mod.ts";
import * as AccountController from "../controllers/account.ts";
const SUB_ROUTE = "/account";

const withAccountRoutes = (router: Router) => {
  router
    .post(SUB_ROUTE + "/create", AccountController.createAccount)
    .post(SUB_ROUTE + "/login", AccountController.login)
    .get(
      SUB_ROUTE + "/current",
      AccountController.validateUser,
      ({ request, response, cookies }) => {
        // @ts-ignore
        console.log(request.user);
      }
    );
};

export default withAccountRoutes;

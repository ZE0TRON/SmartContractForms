import { Router } from "https://deno.land/x/oak/mod.ts";

const SUB_ROUTE = "/account";

const withAccountRoutes = (router: Router) => {
  router
    .get(SUB_ROUTE + "/new", ({ request, response, cookies }) => {
      console.log("Cookies : ", cookies);
      response.body = "Will be avaiable soon";
    })
    .get(SUB_ROUTE + "/current", ({ request, response, cookies }) => {
      response.body = "You are the wise one";
    });
};

export default withAccountRoutes;

import { Router } from "https://deno.land/x/oak/mod.ts";

const SUB_ROUTE = "/contract";

const withContractRoutes = (router: Router) => {
  router
    .get(SUB_ROUTE + "/new", ({ request, response, cookies }) => {
      console.log("Cookies : ", cookies);
      response.body = "Give us the address and abi";
    })
    .get(SUB_ROUTE + "/current", ({ request, response, cookies }) => {
      response.body = "ERC20 ?";
    });
};

export default withContractRoutes;

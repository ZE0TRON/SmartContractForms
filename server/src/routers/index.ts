import { Router } from "https://deno.land/x/oak/mod.ts";

import withAccountRoutes from "./account.ts";
import withContractRoutes from "./contract.ts";

const router = new Router();

withAccountRoutes(router);
withContractRoutes(router);

export default router;

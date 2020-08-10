import { Router } from "https://deno.land/x/oak/mod.ts";

import withAccountRoutes from "./account.ts";
import withFormRoutes from "./form.ts";

const router = new Router();

withAccountRoutes(router);
withFormRoutes(router);

export default router;

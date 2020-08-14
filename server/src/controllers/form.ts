import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import Account from "../models/account.ts";
import Form from "../models/form.ts";
import BasicResponse from "../utils/middleware/basicResponse.ts";

// @ts-ignore
export const createForm = async ({ request, response, cookies }) => {
  const requestBody = request.body();
  const body = await requestBody.value;
  const user = request.user;
  console.log(user);
  //@ts-ignore
  const form = await Form.createForm(window.db, user.account_id, body);
  response.body = { success: true, form: form };
};

export const getForm = async (ctx: Context) => {
  const params = helpers.getQuery(ctx, { mergeParams: true });
  console.log(params);
  if (!params || typeof params === "undefined") {
    ctx.response.status = 400;
    return;
  }
  //@ts-ignore
  const form_id = params.id;
  if (!form_id || typeof form_id === "undefined") {
    ctx.response.status = 400;
    return;
  }
  //@ts-ignore
  const form = await Form.getByID(window.db, form_id);
  console.log(form);
  ctx.response.body = form.page;
  ctx.response.status = 200;
  return;
};

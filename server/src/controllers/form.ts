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

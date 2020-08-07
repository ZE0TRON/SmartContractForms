import Account from "../models/account.ts";
import Form from "../models/form.ts";
import BasicResponse from "../utils/middleware/basicResponse.ts";

// @ts-ignore
export const validateUser = async (ctx, next) => {
  next();
};

// @ts-ignore
export const createForm = async ({ request, response, cookies }) => {
  const requestBody = request.body();
  const body = await requestBody.value;
  response.body = { success: true };
};

import Account from "../models/account.ts";
import BasicResponse from "../utils/middleware/basicResponse.ts";
const SESSION_ID_COOKIE_NAME = "sessionID";

// TODO Fix this ts ignores
// @ts-ignore

export const validateUser = async (ctx, next) => {
  const sessionID = ctx.cookies.get(SESSION_ID_COOKIE_NAME);
  if (!sessionID) {
    ctx.response.body = new BasicResponse(
      false,
      "You are not logged in"
    ).toJSON();
    ctx.response.status = 401;
    return;
  }
  const user = await Account.getBySessionID(window.db, sessionID);
  if (!user) {
    ctx.response.body = new BasicResponse(
      false,
      "Session is expired please login again"
    ).toJSON();
    ctx.response.status = 401;
    return;
  }
  ctx.request.user = user;
  next();
};

// @ts-ignore
export const createAccount = async ({ request, response, cookies }) => {
  const requestBody = request.body();
  const body = await requestBody.value;
  const email = body.email;
  const password = body.password;
  const account = await Account.createAccount(window.db, email, password);
  cookies.set(SESSION_ID_COOKIE_NAME, account.sessionID);
  response.body = new BasicResponse(true).toJSON();
};

// @ts-ignore
export const login = async ({ request, response, cookies }) => {
  const body = request.body();
  const { email, password } = await body.value;
  const user = await Account.getByEmail(window.db, email);
  if (!user) {
    response.body = new BasicResponse(false, "No such user").toJSON();
    response.status = 401;
    return;
  }
  const isValid = await user.verifyPassword(password);
  console.log(isValid);
  if (!isValid) {
    response.body = new BasicResponse(false, "Wrong Password").toJSON();
    response.status = 401;
    return;
  }
  await user.createNewSession(window.db);
  cookies.set(SESSION_ID_COOKIE_NAME, user.sessionID);
  response.status = 200;
};

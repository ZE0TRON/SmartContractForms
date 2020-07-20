import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import * as queries from "./queries.ts";

const DB_USER = Deno.env.get("DB_USER");
const DB_NAME = Deno.env.get("DB_NAME");
const DB_HOST = Deno.env.get("DB_HOST");
const DB_PORT = parseInt(Deno.env.get("DB_PORT") || "5432");

let client: Client;

export const connectToDB = async () => {
  client = new Client({
    user: DB_USER,
    database: DB_NAME,
    hostname: DB_HOST,
    port: DB_PORT
  });
  await client.connect();
};

export const getUserByEmail = async (email: string) => {
  const result = await client.query(queries.GET_USER_BY_EMAIL_QUERY, email);
  return result;
};
export const addUser = async (email: string, password: string) => {
  const result = await client.query(queries.CREATE_USER_QUERY, email, password);
  return result;
};
export const disconnectFromDB = async () => await client.end();

export async function clearDB() {
  let result = await client.query(queries.DROP_USERS_QUERY);
  result = await client.query(queries.DROP_INTEGRATIONS_QUERY);
  result = await client.query(queries.DROP_MATCHINGS_QUERY);
  result = await client.query(queries.DROP_FORMS_QUERY);
}
export async function initDB() {
  let result = await client.query(queries.CREATE_USER_TABLE_QUERY);
  result = await client.query(queries.CREATE_INTEGRATION_TABLE_QUERY);
  result = await client.query(queries.CREATE_MATCHING_TABLE_QUERY);
  result = await client.query(queries.CREATE_FORM_TABLE_QUERY);
}

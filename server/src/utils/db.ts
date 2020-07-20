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
  console.log(result);
  return result;
};
export const disconnectFromDB = async () => await client.end();

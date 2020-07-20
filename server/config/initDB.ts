import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import {
  CREATE_USER_TABLE_QUERY,
  CREATE_FORM_TABLE_QUERY,
  CREATE_MATCHING_TABLE_QUERY,
  CREATE_INTEGRATION_TABLE_QUERY
} from "../src/utils/queries.ts";

const DB_USER = Deno.env.get("DB_USER");
const DB_NAME = Deno.env.get("DB_NAME");
const DB_HOST = Deno.env.get("DB_HOST");
const DB_PORT = parseInt(Deno.env.get("DB_PORT") || "5432");

console.log("db user :", DB_USER);

async function main() {
  const client = new Client({
    user: DB_USER,
    database: DB_NAME,
    hostname: DB_HOST,
    port: DB_PORT
  });
  await client.connect();
  let result = await client.query(CREATE_USER_TABLE_QUERY);
  console.log(result.rows);
  result = await client.query(CREATE_INTEGRATION_TABLE_QUERY);
  console.log(result.rows);
  result = await client.query(CREATE_MATCHING_TABLE_QUERY);
  console.log(result.rows);
  result = await client.query(CREATE_FORM_TABLE_QUERY);
  console.log(result.rows);

  await client.end();
}

main();

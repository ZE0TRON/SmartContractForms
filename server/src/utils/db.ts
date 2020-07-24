import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import * as queries from "./queries.ts";
import Integration from "../models/integration.ts";

export interface InsertResult {}

const DB_USER = Deno.env.get("DB_USER");
const DB_NAME = Deno.env.get("DB_NAME");
const DB_HOST = Deno.env.get("DB_HOST");
const DB_PASSWORD = Deno.env.get("DB_PASSWORD");

const DB_PORT = parseInt(Deno.env.get("DB_PORT") || "5432");

let client: Client;
// Account Tx's
export const getUserByEmail = async (email: string) => {
  const result = await client.query(queries.GET_USER_BY_EMAIL_QUERY, email);
  return result.rows;
};

export const getUserBySessionID = async (sessionID: string) => {
  const result = await client.query(
    queries.GET_USER_BY_SESSION_ID_QUERY,
    sessionID
  );
  return result.rows;
};

export const getAllUsers = async () => {
  const result = await client.query(queries.GET_ALL_USERS_QUERY);
  return result.rows;
};

export const addUser = async (email: string, password: string) => {
  const result = await client.query(queries.CREATE_USER_QUERY, email, password);
  return result;
};
// Form Tx's
export const addForm = async (
  integration_id: number,
  user_id: number,
  page: string
) => {
  const result = await client.query(
    queries.CREATE_FORM_QUERY,
    integration_id,
    user_id,
    page
  );
  return result;
};

export const getFormsOfUser = async (user_id: number) => {
  const result = await client.query(queries.GET_FORMS_OF_USER_QUERY, user_id);
  return result.rows;
};
// Integration Tx's
export const getIntegrationsOfForm = async (integration_id: number) => {
  const result = await client.query(
    queries.GET_INTEGRATIONS_OF_FORM_QUERY,
    integration_id
  );
  return result.rows;
};

export const addIntegration = async (integration: Integration) => {
  const result = await client.query(
    queries.CREATE_INTEGRATION_QUERY,
    integration.user_id,
    integration.contract.address,
    integration.contract.abi,
    integration.contract.method,
    integration.form_url
  );
  console.log(result);
  return result.rows;
};

export const getIntegrationByID = async (integration_id: number) => {
  const result = await client.query(
    queries.GET_INTEGRATIONS_BY_ID_QUERY,
    integration_id
  );
  return result.rows;
};
// Main DB Function
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

export const connectToDB = async () => {
  client = new Client({
    user: DB_USER,
    database: DB_NAME,
    hostname: DB_HOST,
    port: DB_PORT,
    password: DB_PASSWORD,
  });
  await client.connect();
};

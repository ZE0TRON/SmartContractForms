import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import * as queries from "./queries.ts";
import Integration from "../models/integration.ts";
import Account from "../models/account.ts";
import Form from "../models/form.ts";
import Matching from "../models/matching.ts";

const DB_USER = Deno.env.get("DB_USER");
const DB_NAME = Deno.env.get("DB_NAME");
const DB_HOST = Deno.env.get("DB_HOST");
const DB_PASSWORD = Deno.env.get("DB_PASSWORD");

const DB_PORT = parseInt(Deno.env.get("DB_PORT") || "5432");

// Account Tx's
export const getUserByEmail = async (db: Client, email: string) => {
  const result = await db.query(queries.GET_USER_BY_EMAIL_QUERY, email);
  return result.rows;
};

export const getUserBySessionID = async (db: Client, sessionID: string) => {
  const result = await db.query(
    queries.GET_USER_BY_SESSION_ID_QUERY,
    sessionID
  );
  return result.rows;
};

export const getAllUsers = async (db: Client) => {
  const result = await db.query(queries.GET_ALL_USERS_QUERY);
  return result.rows;
};

export const addUser = async (db: Client, user: Account) => {
  const result = await db.query(
    queries.CREATE_USER_QUERY,
    user.email,
    user.password
  );
  return result.rows[0][0];
};
// Form Tx's
export const addForm = async (db: Client, form: Form) => {
  const result = await db.query(
    queries.CREATE_FORM_QUERY,
    form.integration_id,
    form.user_id,
    form.page
  );
  return result.rows[0][0];
};

export const getFormsOfUser = async (db: Client, user_id: number) => {
  const result = await db.query(queries.GET_FORMS_OF_USER_QUERY, user_id);
  return result.rows;
};
// Integration Tx's
export const getIntegrationsOfForm = async (
  db: Client,
  integration_id: number
) => {
  const result = await db.query(
    queries.GET_INTEGRATIONS_OF_FORM_QUERY,
    integration_id
  );
  return result.rows;
};

export const addIntegration = async (db: Client, integration: Integration) => {
  const result = await db.query(
    queries.CREATE_INTEGRATION_QUERY,
    integration.user_id,
    integration.contract.address,
    integration.contract.abi,
    integration.contract.method
  );

  return result.rows[0][0];
};

export const getIntegrationByID = async (
  db: Client,
  integration_id: number
) => {
  const result = await db.query(
    queries.GET_INTEGRATIONS_BY_ID_QUERY,
    integration_id
  );
  return result.rows;
};
// Matching Tx's
export const getMatchingByID = async (db: Client, matching_id: number) => {
  const result = await db.query(queries.GET_MATCHINGS_BY_ID_QUERY, matching_id);
  return result.rows;
};

export const getMatchingsOfIntegration = async (
  db: Client,
  integration_id: number
) => {
  const result = await db.query(
    queries.GET_MATCHINGS_OF_INTEGRATION_QUERY,
    integration_id
  );
  return result.rows;
};

export const addMatching = async (db: Client, matching: Matching) => {
  const result = await db.query(
    queries.CREATE_MATCHING_QUERY,
    matching.integration_id,
    matching.form_field,
    matching.contract_parameter
  );
  return result.rows[0][0];
};
// Main DB Function
export const disconnectFromDB = async (db: Client) => await db.end();

export async function clearDB(db: Client) {
  let result = await db.query(queries.DROP_USERS_QUERY);
  result = await db.query(queries.DROP_INTEGRATIONS_QUERY);
  result = await db.query(queries.DROP_MATCHINGS_QUERY);
  result = await db.query(queries.DROP_FORMS_QUERY);
}

export async function initDB(db: Client) {
  let result = await db.query(queries.CREATE_USER_TABLE_QUERY);
  result = await db.query(queries.CREATE_INTEGRATION_TABLE_QUERY);
  result = await db.query(queries.CREATE_MATCHING_TABLE_QUERY);
  result = await db.query(queries.CREATE_FORM_TABLE_QUERY);
}

export const connectToDB = async () => {
  const db = new Client({
    user: DB_USER,
    database: DB_NAME,
    hostname: DB_HOST,
    port: DB_PORT,
    password: DB_PASSWORD,
  });
  await db.connect();
  return db;
};

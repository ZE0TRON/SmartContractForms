import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import { cuid as generateSessionID } from "https://deno.land/x/cuid@v1.0.0/index.js";

import {
  getAllUsers,
  getUserByEmail,
  getUserBySessionID,
  addUser,
  updateSessionID,
} from "../utils/db.ts";

export default class Account {
  account_id: number;
  email: string;
  password: string;
  sessionID: string | null;

  constructor(
    email: string,
    password: string,
    sessionID: string | null,
    account_id: number = 0
  ) {
    this.account_id = account_id;
    this.email = email;
    this.password = Account.hashPassword(password);
    this.sessionID = sessionID;
  }

  static fromSqlQuery(cols: Array<any>): Account {
    const account_id = cols[0];
    const email = cols[1];
    const password = cols[2];
    const sessionID = cols[3];
    const account = new Account(email, "temp", sessionID, account_id);
    account.password = password;
    return account;
  }

  static async getAccounts(db: Client): Promise<Array<Account>> {
    // Not sure what to call it array of user field columns array
    const accountCols = await getAllUsers(db);
    const accounts = accountCols.map((accountCol) =>
      Account.fromSqlQuery(accountCol)
    );
    return accounts;
  }

  static async getByEmail(db: Client, email: string): Promise<Account | null> {
    const accountCol = (await getUserByEmail(db, email))[0];
    if (!accountCol || accountCol.length === 0) return null;
    const account = Account.fromSqlQuery(accountCol);
    return account;
  }

  static async getBySessionID(
    db: Client,
    sessionID: string
  ): Promise<Account | null> {
    const accountCol = await getUserBySessionID(db, sessionID);
    if (!accountCol || accountCol.length === 0) return null;
    const account = Account.fromSqlQuery(accountCol);
    return account;
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  async createNewSession(db: Client) {
    this.sessionID = generateSessionID();
    this.updateSessionAtDB(db);
  }

  async updateSessionAtDB(db: Client) {
    if (this.sessionID) {
      await updateSessionID(db, this.email, this.sessionID);
    }
  }

  static verifyPassword(
    passwordHash: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  static async createAccount(
    db: Client,
    email: string,
    password: string
  ): Promise<Account> {
    const sessionID = generateSessionID();
    const account = new Account(email, password, sessionID);
    const accountID = await addUser(db, account);
    account.account_id = accountID;
    return account;
  }

  static async updateAccount() {}

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(password);
  }
}

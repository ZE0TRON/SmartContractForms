import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

import {
  getAllUsers,
  getUserByEmail,
  getUserBySessionID,
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
    const id = cols[0];
    const email = cols[1];
    const password = cols[2];
    const sessionID = cols[3];
    const account = new Account(id, email, "temp", sessionID);
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

  static async getByEmail(db: Client, email: string): Promise<Account> {
    const accountCol = await getUserByEmail(db, email);
    const account = Account.fromSqlQuery(accountCol);
    return account;
  }

  static async getBySessionID(db: Client, sessionID: string): Promise<Account> {
    const accountCol = await getUserBySessionID(db, sessionID);
    const account = Account.fromSqlQuery(accountCol);
    return account;
  }

  static verifyPassword(
    passwordHash: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  static async createAccount() {}

  static async updateAccount() {}

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(password);
  }
}

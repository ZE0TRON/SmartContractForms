import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default class Account {
  id: number;
  email: string;
  password: string;
  sessionID: string;

  constructor(id: number, email: string, password: string, sessionID: string) {
    this.id = id;
    this.email = email;
    this.password = Account.hashPassword(password);
    this.sessionID = sessionID;
  }

  fromSqlQuery() {}

  static verifyPassword(
    passwordHash: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(password);
  }
}

export default class BasicResponse {
  success: boolean;
  err: string | null;
  data: any | null;
  constructor(
    success: boolean,
    err: string | null = null,
    data: any | null = null
  ) {
    this.success = success;
    this.err = err;
    this.data = data;
  }
  toJSON() {
    return { success: this.success, err: this.err, data: this.data };
  }
}

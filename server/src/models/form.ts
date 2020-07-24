export default class Form {
  form_id: number;
  integration_id: number;
  user_id: number;
  page: string;

  constructor(
    form_id: number,
    integration_id: number,
    user_id: number,
    page: string
  ) {
    this.form_id = form_id;
    this.integration_id = integration_id;
    this.user_id = user_id;
    this.page = page;
  }

  static createForm() {}
}

import { Client } from "https://deno.land/x/postgres/mod.ts";

import Matching from "./matching.ts";
import Integration from "./integration.ts";
import createPage from "../utils/form/createPage.ts";
import { FormDTO } from "../utils/middleware/dto/form.ts";
import { addForm, getFormByID, getFormsOfUser } from "../utils/db.ts";
import { FormListingDTO } from "../utils/middleware/dto/form";
import { getIntegrationsOfForm } from "../utils/db";

export default class Form {
  form_id: number;
  integration_id: number;
  user_id: number;
  page: string;
  name: string;
  constructor(
    integration_id: number,
    user_id: number,
    page: string,
    name: string,
    form_id: number = 0
  ) {
    this.form_id = form_id;
    this.integration_id = integration_id;
    this.user_id = user_id;
    this.page = page;
    this.name = name;
  }

  static async createForm(db: Client, user_id: number, formDTO: FormDTO) {
    const integrationDTO = formDTO.integration;
    const contractDTO = integrationDTO.contract;
    const matchingDTOs = integrationDTO.matchings;
    const matchings = new Array<Matching>();
    const integration = await Integration.fromDTO(db, user_id, integrationDTO);

    for (let matchingDTO of matchingDTOs) {
      const matching = await Matching.fromDTO(
        db,
        matchingDTO,
        integration.integration_id
      );
      matchings.push(matching);
    }
    const page = await createPage(integration, matchings);
    const form = new Form(
      integration.integration_id,
      user_id,
      page,
      formDTO.name
    );
    const form_id = await addForm(db, form);
    console.log(form_id);
    form.form_id = form_id;
    return form;
  }

  static async getByID(db: Client, form_id: number) {
    return this.fromSqlQuery(await getFormByID(db, form_id));
  }
  static fromSqlQuery(cols: Array<any>) {
    const form_id = cols[0];
    const integration_id = cols[1];
    const user_id = cols[2];
    const page = cols[3];
    const name = cols[4];
    const form = new Form(integration_id, user_id, page, name, form_id);
    return form;
  }
  static async formToListingDTO(
    db: Client,
    form: Form
  ): Promise<FormListingDTO> {
    const integration = await getIntegrationsOfForm(db, form.form_id);
    return new FormListingDTO(form.form_id, form.name, integration.form_url);
  }
  static async getUserForms(db: Client, user_id: number) {
    const forms = (await getFormsOfUser(db, user_id)).map(this.fromSqlQuery);
    const result = forms.map(
      async (form) => await this.formToListingDTO(db, form)
    );
    return result;
  }
}

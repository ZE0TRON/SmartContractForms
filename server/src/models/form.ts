import { Client } from "https://deno.land/x/postgres/mod.ts";

import Matching from "./matching.ts";
import Integration from "./integration.ts";
import createPage from "../utils/form/createPage.ts";
import { FormDTO } from "../utils/middleware/dto/form.ts";
import { addForm } from "../utils/db.ts";

export default class Form {
  form_id: number;
  integration_id: number;
  user_id: number;
  page: string;

  constructor(
    integration_id: number,
    user_id: number,
    page: string,
    form_id: number = 0
  ) {
    this.form_id = form_id;
    this.integration_id = integration_id;
    this.user_id = user_id;
    this.page = page;
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
    const form = new Form(integration.integration_id, user_id, page);
    const form_id = await addForm(db, form);
    form.form_id = form_id;
    return form;
  }
}

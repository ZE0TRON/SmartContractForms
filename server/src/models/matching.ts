import { Client } from "https://deno.land/x/postgres/mod.ts";
import { MatchingDTO } from "../utils/middleware/dto/form.ts";
import { addMatching } from "../utils/db.ts";

export default class Matching {
  matching_id: number;
  integration_id: number;
  form_field: string;
  contract_parameter: string;
  constructor(
    integration_id: number,
    form_field: string,
    contract_parameter: string,
    matching_id: number = 0
  ) {
    this.integration_id = integration_id;
    this.form_field = form_field;
    this.contract_parameter = contract_parameter;
    this.matching_id = matching_id;
  }

  static async fromDTO(
    db: Client,
    matchingDTO: MatchingDTO,
    integration_id: number
  ) {
    const { form_field, contract_parameter } = matchingDTO;
    const matching = new Matching(
      integration_id,
      form_field,
      contract_parameter
    );
    const matching_id = await addMatching(db, matching);
    matching.matching_id = matching_id;
    return matching;
  }
}

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
}

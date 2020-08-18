export class MatchingDTO {
  form_field: string;
  contract_parameter: string;
  constructor(form_field: string, contract_parameter: string) {
    this.form_field = form_field;
    this.contract_parameter = contract_parameter;
  }
}

export class ContractDTO {
  address: string;
  method: string;
  abi: string;
  constructor(address: string, method: string, abi: string) {
    this.address = address;
    this.method = method;
    this.abi = abi;
  }
}

export class IntegrationDTO {
  contract: ContractDTO;
  matchings: MatchingDTO[];
  form_url: string;
  constructor(
    contract: ContractDTO,
    matchings: MatchingDTO[],
    form_url: string
  ) {
    this.contract = contract;
    this.matchings = matchings;
    this.form_url = form_url;
  }
}

export class FormDTO {
  integration: IntegrationDTO;
  name: string;
  constructor(integration: IntegrationDTO, name: string) {
    this.integration = integration;
    this.name = name;
  }
}

export class FormListingDTO {
  form_id: number;
  name: string;
  jotform_url: string;
  constructor(form_id: number, name: string, jotform_url: string) {
    this.form_id = form_id;
    this.name = name;
    this.jotform_url = jotform_url;
  }
}

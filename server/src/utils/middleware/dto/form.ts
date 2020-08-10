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
  constructor(integration: IntegrationDTO) {
    this.integration = integration;
  }
}

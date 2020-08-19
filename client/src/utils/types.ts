export interface MatchingTuple {
  field: FormField;
  param: MethodParam;
}
export interface ContractInfo {
  address: string;
  methods: Array<string>;
}
export interface ContractMethod {
  method: string;
  params: Array<string>;
}
export interface FormInfo {
  url: string;
  fields: Array<string>;
}
export interface Integration {
  contractInfo: ContractInfo;
  contractMethod: ContractMethod;
  matchings: Array<MatchingTuple>;
  formInfo: FormInfo;
}
export interface MethodParam {
  name: string;
  paramType: string;
}

export interface FormField {
  field: string;
  id: number;
}

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
  payment: string | null;
  constructor(
    contract: ContractDTO,
    matchings: MatchingDTO[],
    form_url: string,
    payment: string | null
  ) {
    this.contract = contract;
    this.matchings = matchings;
    this.form_url = form_url;
    this.payment = payment;
  }
}

export class FormDTO {
  integration: IntegrationDTO;
  name: string;
  constructor(integration: IntegrationDTO, name: string) {
    this.name = name;
    this.integration = integration;
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

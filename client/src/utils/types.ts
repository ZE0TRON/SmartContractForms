export interface MatchingTuple {
  field: string;
  param: string;
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

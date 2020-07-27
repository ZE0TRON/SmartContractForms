class Contract {
  address: string;
  abi: string;
  method: string;

  constructor(
    contract_address: string,
    contract_abi: string,
    contract_method: string
  ) {
    this.address = contract_address;
    this.abi = contract_abi;
    this.method = contract_method;
  }
}

export default class Integration {
  integration_id: number;
  user_id: number;
  contract: Contract;

  constructor(
    user_id: number,
    contract_address: string,
    contract_abi: string,
    contract_method: string,
    integration_id: number = 0
  ) {
    this.contract = new Contract(
      contract_address,
      contract_abi,
      contract_method
    );
    this.user_id = user_id;
    this.integration_id = integration_id;
  }
}

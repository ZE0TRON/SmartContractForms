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
  user_id: number;
  form_url: string;
  contract: Contract;

  constructor(
    user_id: number,
    contract_address: string,
    contract_abi: string,
    contract_method: string,
    form_url: string
  ) {
    this.contract = new Contract(
      contract_address,
      contract_abi,
      contract_method
    );
    this.user_id = user_id;
    this.form_url = form_url;
  }
}

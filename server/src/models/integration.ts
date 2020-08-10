import { Client } from "https://deno.land/x/postgres/mod.ts";

import { IntegrationDTO } from "../utils/middleware/dto/form.ts";
import { addIntegration } from "../utils/db.ts";

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
  form_url: string;
  constructor(
    user_id: number,
    contract_address: string,
    contract_abi: string,
    contract_method: string,
    form_url: string,
    integration_id: number = 0
  ) {
    this.contract = new Contract(
      contract_address,
      contract_abi,
      contract_method
    );
    this.user_id = user_id;
    this.integration_id = integration_id;
    this.form_url = form_url;
  }
  static async fromDTO(
    db: Client,
    user_id: number,
    integrationDTO: IntegrationDTO
  ) {
    const { contract, form_url } = integrationDTO;
    const { address, abi, method } = contract;
    const integration = new Integration(
      user_id,
      address,
      abi,
      method,
      form_url
    );
    const integration_id = await addIntegration(db, integration);
    integration.integration_id = integration_id;
    return integration;
  }
}

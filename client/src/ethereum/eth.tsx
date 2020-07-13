import Web3 from "web3";
import { provider } from "web3-core/types";
import { Contract } from "web3-eth-contract/types";

const DEFAULT_OPTIONS = {
  gasPrices: Web3.utils.toWei("4.1", "Gwei")
};

export default class Eth {
  web3: Web3;
  account: string | undefined;
  contract: Contract | undefined;
  constructor(provider: provider) {
    this.web3 = new Web3(provider);
  }
  /* Must Run this function to initilaize the eth class
   */
  async init() {
    await this.setAccount();
  }

  async setAccount() {
    this.account = (await this.getAccounts())[0];
  }

  setAccountWithAddress(address: string) {
    this.account = address;
  }

  private getAccounts() {
    return new Promise<Array<string>>((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          console.log(err);
          throw err;
          reject(err);
        }
        console.log(accounts);
        resolve(accounts);
      });
    });
  }

  setContract(address: string, abi: any) {
    this.contract = new this.web3.eth.Contract(abi, address);
    this.contract.options.from = this.account;
  }

  private checkContract() {
    if (typeof this.contract === "undefined") {
      throw new Error("You must set contract first");
    }
  }

  getContractMethods() {
    this.checkContract();
    const methodArray = this.contract?.methods;
    const methodNames = Object.keys(methodArray).filter(method =>
      method.includes("(")
    );
    return methodNames;
  }

  async callPassiveMethod(methodName: string) {
    this.checkContract();
    console.log("getting message");
    const result = await this.contract?.methods[methodName]().call();
    console.log(result);
    return result;
  }

  async callMethod(
    methodName: string,
    params: Array<any> | null,
    options: any | null
  ) {
    this.checkContract();
    options = options || DEFAULT_OPTIONS;
    const txHash = await this.contract?.methods[methodName]
      .apply(null, params)
      .send(options);
    return txHash;
  }
}

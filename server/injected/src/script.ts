import Eth from "./ethereum/eth";
import { connectToEth } from "./ethereum/metamask";

import Web3 from "web3";
import ByteBuffer from "bytebuffer";

// TODO disable submit after submission
// TODO loading model
const ETHERSCAN_API_KEY = "3JGBFBRV39B3SMPSNJPB3TW6NG255R5BKI";
const ETHERSCAN_API_URL =
  "https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus";

interface Matching {
  field: string;
  param: string;
  order: number | null;
}

interface Contract {
  address: string;
  methodName: string;
  abi: any;
}

let eth: Eth;
let verifyIntervalFunc: any;
let verifyCounter = 0;
const enableEth = async () => {
  eth = await connectToEth();
};

const verifyTransaction = async (txHash: string) => {
  const url =
    ETHERSCAN_API_URL + "&txhash=" + txHash + "&apikey=" + ETHERSCAN_API_KEY;
  const response = await fetch(url);
  const json = await response.json();

  if (json.status === "1") {
    console.log("verified");
    clearInterval(verifyIntervalFunc);
    verifyCounter = 0;
    document.querySelector(".submit-button").textContent = "Verified";
    document.querySelector("form").submit();
    return;
  } else if (verifyCounter > 60) {
    console.log("Operation took too long");
    clearInterval(verifyIntervalFunc);
    verifyCounter = 0;
  }

  verifyCounter += 3;
};

const callMethod = async (
  contract: Contract,
  params: any[],
  options: any | null = null
) => {
  // TODO: call metamask;
  const txHash = await eth.callMethod(contract.methodName, params, options);
  verifyIntervalFunc = setInterval(
    async () => await verifyTransaction(txHash),
    3000
  );
};

const submitClick = async (e: Event) => {
  e.preventDefault();
  console.log("clicked");
  await enableEth();
  console.log("Eth enabled");
  // @ts-expect-error
  console.log(CONTRACT_ABI);

  // @ts-expect-error
  console.log(CONTRACT_METHOD_NAME);
  // @ts-expect-error
  eth.setContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  console.log("Contract set");
  const contract = {
    // @ts-expect-error
    address: CONTRACT_ADDRESS,

    // @ts-expect-error
    methodName: CONTRACT_METHOD_NAME,

    // @ts-expect-error
    abi: CONTRACT_ABI,
  } as Contract;

  // @ts-expect-error
  const method_params = eth.getMethodParams(CONTRACT_METHOD_NAME);
  const param_names = method_params.map((param) => param.name);
  console.log(method_params);
  // @ts-expect-error
  const matchings = Matchings as Matching[];
  for (let matching of matchings) {
    matching.order = param_names.indexOf(matching.param);
  }
  matchings.sort((m1, m2) => m1.order - m2.order);
  const params = matchings.map((matching) => {
    const inputField = document.querySelector(
      "#" + matching.field
    ) as HTMLInputElement;
    let value = inputField.value;
    const isInt = method_params[
      param_names.indexOf(matching.param)
    ].paramType.includes("int");
    //const isAddress = method_params[
    //param_names.indexOf(matching.param)
    //].paramType.includes("address");

    let parsedValue;
    if (isInt) parsedValue = parseInt(value);
    //else if (isAddress) parsedValue = ByteBuffer.fromHex(value.substr(2));
    else parsedValue = value;
    return parsedValue;
  });

  console.log("Params", params);
  console.log("Contract", contract);
  const options = {
    gasPrices: Web3.utils.toWei("4.1", "Gwei"),
  };

  try {
    //@ts-expect-error
    if (PAYMENT_FIELD && typeof PAYMENT_FIELD !== "undefined") {
      //@ts-expect-error
      options.value = Web3.utils.toWei(getPaymentAmount(), "ether");
    }
  } catch (err) {
    console.log(err);
  }
  //@ts-expect-error
  document.querySelector(".submit-button").disable();
  document.querySelector(".submit-button").textContent =
    "Waiting for verification";
  await callMethod(contract, params, options);
  // setTimeout(() => , 2000);
};

const getValueForMatching = (matching: Matching) => {
  const inputField = document.querySelector(
    "#" + matching.field
  ) as HTMLInputElement;

  return inputField.value;
};
const getPaymentAmount = () => {
  const paymentField = document.querySelector(
    //@ts-expect-error
    "#" + PAYMENT_FIELD
  ) as HTMLInputElement;

  return paymentField.value;
};
//@ts-ignore
window.submitClick = submitClick;

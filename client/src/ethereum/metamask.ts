import Eth from "./eth";
//@ts-ignore
import detectEthereumProvider from "@metamask/detect-provider";

const enableEth = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    //@ts-ignore
    const ethereum = window["ethereum"];
    await ethereum.enable();
    //console.log(provider);
    return provider;
  } else {
    console.log("No ethereum provider found");
  }
};
export const connectToEth = async (): Promise<Eth> => {
  const provider = await enableEth();
  const eth = new Eth(provider);
  await eth.init();
  return eth;
};

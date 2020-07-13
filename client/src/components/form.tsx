import React, { MouseEvent, useState, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import Web3 from "web3";
import web3Types from "web3/types";
import axios from "axios";
//@ts-ignore
import detectEthereumProvider from "@metamask/detect-provider";

import { abi } from "../contract.json";

import { getFormField } from "../utils/formParser";
import Eth from "../ethereum/eth";
const CONTRACT_ADRESS = "0xE875927e83A6A009521cBbA9abbc5bfA42B946B3";
const ETHERSCAN_API_KEY = "3JGBFBRV39B3SMPSNJPB3TW6NG255R5BKI";
const ETHERSCAN_API_URL =
  "https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus";

let contract: any = null;
let ethereum: any = null;
let eth: Eth;
function EmailForm() {
  const [message, setMessage] = useState("");
  const [ethMessage, setEthMessage] = useState(
    "Please connect to ethereum to see the message"
  );
  const [txStatus, setTxStatus] = useState(null);
  const enableEth = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      //@ts-ignore
      ethereum = window["ethereum"];
      await ethereum.enable();
      //console.log(provider);
      eth = new Eth(provider);
      //@ts-ignore
      //if (typeof window.ethereum.request !== "undefined") {
      //const accounts = await ethereum.request({
      //method: "eth_requestAccounts"
      //});
      //const account = accounts[0];
      //eth.setAccountWithAddress(account);
      //getEthMessage();
      //}
      ////@ts-ignore
      //else if (typeof window.web3 !== "undefined") {
      ////@ts-ignore
      //const windowWeb3 = window["web3"];
      //}
      await eth.init();
      await getEthMessage();
    } else {
      console.log("No ethereum provider found");
    }
  };

  const getEthMessage = async () => {
    let abiAny = abi as any;
    eth.setContract(CONTRACT_ADRESS, abiAny);
    console.log(eth.getContractMethods());
    try {
      let result = await eth.callPassiveMethod("message");
      setEthMessage(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessage = (e: ChangeEvent) => {
    console.log("Changing text");
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  };
  // TODO move this to the backend
  const verifyTransaction = async (txHash: string) => {
    const url =
      ETHERSCAN_API_URL + "&txhash=" + txHash + "&apikey=" + ETHERSCAN_API_KEY;
    const response = await axios.get(url);
    const newTxStatus: any = response.data.status ? "verified" : "pending";
    setTxStatus(newTxStatus);
  };
  const submitForm = async (e: MouseEvent) => {
    e.preventDefault();
    await sendMessage();
    console.log("Submitted");
  };

  const sendMessage = async () => {
    // TODO: call metamask;
    const txHash = await eth.callMethod("setMessage", [message], null);
    verifyTransaction(txHash);
    getEthMessage();
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className="messageDiv">
            <p>{ethMessage}</p>
          </div>
          <div className="transaction">
            {txStatus && txStatus === "verified"
              ? "Transaction verified"
              : "Transaction pending"}
          </div>
          <Button variant="primary" type="button" onClick={enableEth}>
            Connect to Ethereum
          </Button>

          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                value={message}
                type="text"
                placeholder="Enter message"
                onChange={updateMessage}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default EmailForm;

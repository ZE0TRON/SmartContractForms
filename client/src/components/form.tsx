import React, { MouseEvent, useState, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import Web3 from "web3";
import axios from "axios";
//@ts-ignore
import detectEthereumProvider from "@metamask/detect-provider";

import { abi } from "../contract.json";

const CONTRACT_ADRESS = "0x39149AA315f97f88AAB7da5a8554411CEc022E3C";
const ETHERSCAN_API_KEY = "3JGBFBRV39B3SMPSNJPB3TW6NG255R5BKI";
const ETHERSCAN_API_URL =
  "https://api-rinkeby.etherscan.io/api?module=transaction&action=gettxreceiptstatus";

let contract: any = null;
let ethereum: any = null;
let web3: Web3;

function EmailForm() {
  const [message, setMessage] = useState("");
  const [ethMessage, setEthMessage] = useState(
    "Please connect to ethereum to see the message"
  );
  const [ethAccount, setEthAccount] = useState(null);
  const enableEth = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      //@ts-ignore
      ethereum = window["ethereum"];
      await ethereum.enable();
      console.log(provider);
      web3 = new Web3(provider);
      //@ts-ignore
      if (typeof window.ethereum.request !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });
        const account = accounts[0];
        setEthAccount(account);
        getEthMessage();
      }
      //@ts-ignore
      else if (typeof window.web3 !== "undefined") {
        //@ts-ignore
        const windowWeb3 = window["web3"];
        web3.eth.getAccounts((error: any, result: any) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(result);
          setEthAccount(result[0]);
          getEthMessage();
        });
      }
    } else {
      console.log("No ethereum provider found");
    }
  };

  const getEthMessage = async () => {
    let abiAny = abi as any;
    contract = new web3.eth.Contract(abiAny, CONTRACT_ADRESS);
    try {
      let result = await contract.methods.message().call();
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
    console.log(
      response.data.status === 1
        ? "Transaction confirmed"
        : "Transaction failed"
    );
  };
  const submitForm = async (e: MouseEvent) => {
    e.preventDefault();
    await sendMessage();
    console.log("Submitted");
  };

  const sendMessage = async () => {
    // TODO: call metamask;

    contract.options.from = ethAccount;
    contract.methods.setMessage(message).send(
      {
        gasPrices: web3.utils.toWei("4.1", "Gwei")
      },
      (error: any, result: any) => {
        if (error) console.log(error);
        console.log(result);
        verifyTransaction(result);
        getEthMessage();
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className="messageDiv">
            <p>{ethMessage}</p>
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

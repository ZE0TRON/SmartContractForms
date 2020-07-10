import React, { MouseEvent, useState, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import Web3 from "web3";
//@ts-ignore
import detectEthereumProvider from "@metamask/detect-provider";

import { abi } from "../contract.json";

const CONTRACT_ADRESS = "0x39149AA315f97f88AAB7da5a8554411CEc022E3C";

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
    //@ts-ignore
    ethereum = window["ethereum"];
    const provider = await detectEthereumProvider();
    web3 = new Web3(provider);
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    setEthAccount(account);
    getEthMessage();
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

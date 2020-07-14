import React, { MouseEvent, useState, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import axios from "axios";

import abi from "../contract.json";

import { getFormField } from "../utils/formParser";
import Eth from "../ethereum/eth";
import { connectToEth } from "../ethereum/metamask";
import EnableEthButton from "./enableEthButton";

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
    eth = await connectToEth();
    await getEthMessage();
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
          <EnableEthButton onClick={enableEth} />
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

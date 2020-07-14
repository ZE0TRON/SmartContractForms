import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  ListGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

import { getFormField } from "../utils/formParser";
import Eth from "../ethereum/eth";
import { connectToEth } from "../ethereum/metamask";
import EnableEthButton from "./enableEthButton";
// TODO split this component to two different components
let eth: Eth;
function IntegrationPage() {
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [abi, setAbi] = useState("");
  const [fields, setFields] = useState(new Array<string>());
  const [methods, setMethods] = useState(["Select Method"]);
  const [method, setMethod] = useState("Select Method");
  const [methodParams, setMethodParams] = useState(new Array<string>());
  // TODO change this to a generic field updater
  const updateUrl = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };
  const updateAddress = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setAddress(target.value);
  };
  const updateAbi = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setAbi(target.value);
  };
  const getFields = async () => {
    const newFields = await getFormField(url);
    console.log(newFields);
    setFields(newFields);
  };
  const enableEth = async () => {
    eth = await connectToEth();
  };
  const methodSelected = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const newMethod = target.innerText;
    setMethod(newMethod);
    getParams(newMethod);
  };
  const getParams = (methodName: string) => {
    methodName = methodName.split("(")[0];
    const params = eth.getMethodParams(methodName);
    setMethodParams(params || []);
    //console.log(params);
  };
  const getMethods = () => {
    if (typeof eth === "undefined") {
      console.log("Enable Eth first");
    }
    eth.setContract(address, JSON.parse(abi));
    setMethods(eth.getContractMethods());
  };
  return (
    <Container>
      <Row>
        <Col>
          <EnableEthButton onClick={enableEth} />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formUrl">
              <Form.Label>JotForm Url</Form.Label>
              <Form.Control
                value={url}
                type="text"
                placeholder="Enter form url"
                onChange={updateUrl}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={getFields}>
              Get Form Fields
            </Button>
          </Form>
        </Col>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formAddress">
              <Form.Label>Contract Info</Form.Label>
              <Form.Control
                value={address}
                type="text"
                placeholder="Enter contract address"
                onChange={updateAddress}
              />
              <Form.Control
                className="mt-1"
                value={abi}
                type="text"
                placeholder="Enter contract ABI"
                onChange={updateAbi}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={getMethods}>
              Get Contract Methods
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={6}>
          <h2>Fields</h2>
          <ListGroup className="mt-1">
            {fields.map((field: string, index: number) => (
              <ListGroup.Item key={index}>{field}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={6}>
          <Row>
            <Col>
              <DropdownButton id="dropdown-basic-button" title={method}>
                {methods.map(methodName => (
                  <Dropdown.Item key={methodName} onClick={methodSelected}>
                    {methodName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Parameters</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {methodParams.length === 0 && <span>No method</span>}
              <ListGroup className="mt-1">
                {methodParams.map((param: string, index: number) => (
                  <ListGroup.Item key={index}>{param}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default IntegrationPage;

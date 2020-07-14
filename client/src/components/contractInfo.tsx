import Eth from "../ethereum/eth";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

export default function ContractInfoForm(props: {
  eth: Eth;
  onMethodParamsUpdated: any;
}) {
  const { eth, onMethodParamsUpdated } = props;
  const [address, setAddress] = useState("");
  const [abi, setAbi] = useState("");
  const [methods, setMethods] = useState(["Select Method"]);
  const [method, setMethod] = useState("Select Method");
  const updateAddress = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setAddress(target.value);
  };
  const updateAbi = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setAbi(target.value);
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
    onMethodParamsUpdated(params || []);
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
    <React.Fragment>
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
      <Row className="mt-2 mb-2">
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
    </React.Fragment>
  );
}

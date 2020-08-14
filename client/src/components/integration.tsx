import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import RP from "request-promise";
import Eth from "../ethereum/eth";
import { connectToEth } from "../ethereum/metamask";
import EnableEthButton from "./enableEthButton";
import IntegrationTable from "./integrationTable";
import {
  MatchingTuple,
  MethodParam,
  FormDTO,
  ContractDTO,
  MatchingDTO,
  IntegrationDTO,
} from "../utils/types";
import FormInfo from "./formInfo";
import ContractInfoForm from "./contractInfo";
// TODO split this component to two different components

function IntegrationPage() {
  const [fields, setFields] = useState(["Select Field"]);
  const [methodParams, setMethodParams] = useState([
    { name: "Select Param", paramType: "string" } as MethodParam,
  ]);
  const [matchings, setMatchings] = useState(Array<MatchingTuple>());
  const [eth, setEth] = useState({} as Eth);
  const [formUrl, setFormUrl] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [abi, setAbi] = useState("");
  const [methodName, setMethodName] = useState("");
  const onMatchingsChange = (newMatchings: Array<MatchingTuple>) =>
    setMatchings(newMatchings);

  const onMethodParamsUpdated = (newParams: Array<MethodParam>) =>
    setMethodParams(newParams);
  const onFieldsUpdated = (newFields: Array<string>) => setFields(newFields);
  const enableEth = async () => {
    setEth(await connectToEth());
  };
  const addMatching = () => {
    const newMatchings = [...matchings];
    const newMatching = {
      field: fields[0],
      param: methodParams[0],
    } as MatchingTuple;
    newMatchings.push(newMatching);
    setMatchings(newMatchings);
  };

  const onMethodNameUpdated = (newMethodName: string) => {
    setMethodName(newMethodName);
  };
  const onAbiUpdated = (abi: any) => {
    setAbi(abi);
  };

  const onContractAddressUpdated = (newContractAddress: string) => {
    setContractAddress(newContractAddress);
  };

  const onFormUrlUpdated = (newFormUrl: string) => {
    setFormUrl(newFormUrl);
  };
  const onCreateClicked = (e: MouseEvent) => {
    const matchingDTOs = matchings.map(
      (matching) => new MatchingDTO(matching.field, matching.param.name)
    );
    const contractDTO = new ContractDTO(contractAddress, methodName, abi);
    const integrationDTO = new IntegrationDTO(
      contractDTO,
      matchingDTOs,
      formUrl
    );
    const formDTO = new FormDTO(integrationDTO);
    const options = {
      method: "POST",
      uri: "http://localhost:8000/form/new",
      body: formDTO,
      json: true, // Automatically stringifies the body to JSON
      jar: true,
      withCredentials: true,
    };

    RP(options)
      .then(function (parsedBody) {
        // POST succeeded...
        console.log(parsedBody);
      })
      .catch(function (err) {
        // POST failed...
        console.log(err);
      });
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
          <FormInfo
            onFormUrlUpdated={onFormUrlUpdated}
            formUrl={formUrl}
            onFieldsUpdated={onFieldsUpdated}
          />
        </Col>
        <Col xs={6}>
          <ContractInfoForm
            eth={eth}
            contractAddress={contractAddress}
            abi={abi}
            methodName={methodName}
            onContractAddressUpdated={onContractAddressUpdated}
            onMethodParamsUpdated={onMethodParamsUpdated}
            onAbiUpdated={onAbiUpdated}
            onMethodNameUpdated={onMethodNameUpdated}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <IntegrationTable
          fields={fields}
          params={methodParams}
          matchings={matchings}
          onMatchingsChange={onMatchingsChange}
        />
        <Button onClick={addMatching}>Add Matching</Button>
      </Row>
      <Row className="mt-2">
        <Col>
          <Button variant="success" onClick={onCreateClicked}>
            Create Integration
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default IntegrationPage;

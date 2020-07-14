import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

import Eth from "../ethereum/eth";
import { connectToEth } from "../ethereum/metamask";
import EnableEthButton from "./enableEthButton";
import IntegrationTable from "./integrationTable";
import { MatchingTuple } from "../utils/types";
import FormInfo from "./formInfo";
import ContractInfoForm from "./contractInfo";
// TODO split this component to two different components
function IntegrationPage() {
  const [fields, setFields] = useState(["Select Field"]);
  const [methodParams, setMethodParams] = useState(["Select Param"]);
  const [matchings, setMatchings] = useState(Array<MatchingTuple>());
  const [eth, setEth] = useState({} as Eth);
  const onMatchingsChange = (newMatchings: Array<MatchingTuple>) =>
    setMatchings(newMatchings);

  const onMethodParamsUpdated = (newParams: Array<string>) =>
    setMethodParams(newParams);
  const onFieldsUpdated = (newFields: Array<string>) => setFields(newFields);
  const enableEth = async () => {
    setEth(await connectToEth());
  };
  const addMatching = () => {
    const newMatchings = [...matchings];
    const newMatching = {
      field: fields[0],
      param: methodParams[0]
    } as MatchingTuple;
    newMatchings.push(newMatching);
    setMatchings(newMatchings);
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
          <FormInfo onFieldsUpdated={onFieldsUpdated} />
        </Col>
        <Col xs={6}>
          <ContractInfoForm
            eth={eth}
            onMethodParamsUpdated={onMethodParamsUpdated}
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
          <Button variant="success">Create Integration</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default IntegrationPage;

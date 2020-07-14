import React from "react";
import Eth from "../ethereum/eth";
import { Button } from "react-bootstrap";
export default function EnableEthButton(props: any) {
  return (
    <Button variant="primary" type="button" onClick={props.onClick}>
      Connect to Ethereum
    </Button>
  );
}

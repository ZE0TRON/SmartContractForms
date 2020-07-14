import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Table, Button } from "react-bootstrap";
import { MatchingTuple } from "../utils/types";
import MatchingLine from "./MatchingLine";
export default function IntegrationTable(props: {
  fields: Array<string>;
  params: Array<string>;
  matchings: Array<MatchingTuple>;
  // TODO create a type for this function
  onMatchingsChange: any;
}) {
  const { fields, params, matchings, onMatchingsChange } = props;
  const onLineChange = (fieldType: string, newParam: string, index: number) => {
    const newMatchings: Array<MatchingTuple> = [...matchings];
    console.log(index);
    if (fieldType === "param") {
      newMatchings[index].param = newParam;
    } else if (fieldType === "field") {
      newMatchings[index].field = newParam;
    }
    onMatchingsChange(newMatchings);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Form Field</th>
          <th>Method Parameter</th>
        </tr>
      </thead>
      <tbody>
        {matchings.map((matching, index: number) => (
          <MatchingLine
            fields={fields}
            params={params}
            field={matching.field}
            param={matching.param}
            onLineChange={onLineChange}
            index={index}
          />
        ))}
      </tbody>
    </Table>
  );
}

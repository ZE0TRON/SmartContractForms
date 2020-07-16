import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Table, Button } from "react-bootstrap";
import { MatchingTuple, MethodParam } from "../utils/types";
import MatchingLine from "./MatchingLine";
export default function IntegrationTable(props: {
  fields: Array<string>;
  params: Array<MethodParam>;
  matchings: Array<MatchingTuple>;
  // TODO create a type for this function
  onMatchingsChange: any;
}) {
  const { fields, params, matchings, onMatchingsChange } = props;
  const onLineChange = (
    fieldType: string,
    newParam: MethodParam | string,
    index: number
  ) => {
    const newMatchings: Array<MatchingTuple> = [...matchings];
    console.log(index);
    if (fieldType === "param") {
      newMatchings[index].param = newParam as MethodParam;
    } else if (fieldType === "field") {
      newMatchings[index].field = newParam as string;
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
            key={index}
          />
        ))}
      </tbody>
    </Table>
  );
}

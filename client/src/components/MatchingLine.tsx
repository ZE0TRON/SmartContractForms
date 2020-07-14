import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MatchingTuple } from "../utils/types";
export default function MatchingLine(props: {
  fields: Array<string>;
  params: Array<string>;
  field: string;
  param: string;
  onLineChange: any;
  index: number;
}) {
  const { fields, params, field, param, onLineChange, index } = props;
  const onDropDownChange = (e: MouseEvent, fieldType: string) => {
    const target = e.target as HTMLElement;
    const newParam = target.innerText;
    if (param !== newParam) {
      onLineChange(fieldType, newParam, index);
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <DropdownButton variant="info" id="dropdown-basic-button" title={field}>
          {fields.map(field => (
            <Dropdown.Item
              key={field}
              onClick={e => {
                onDropDownChange(e as MouseEvent, "field");
              }}
            >
              {field}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </td>
      <td>
        <DropdownButton variant="info" id="dropdown-basic-button" title={param}>
          {params.map(param => (
            <Dropdown.Item
              key={param}
              onClick={e => {
                onDropDownChange(e as MouseEvent, "param");
              }}
            >
              {param}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </td>
    </tr>
  );
}

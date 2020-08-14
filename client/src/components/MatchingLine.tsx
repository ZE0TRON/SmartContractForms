import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MatchingTuple, MethodParam } from "../utils/types";
export default function MatchingLine(props: {
  fields: Array<string>;
  params: Array<MethodParam>;
  field: string;
  param: MethodParam;
  onLineChange: any;
  index: number;
}) {
  const { fields, params, field, param, onLineChange, index } = props;
  const onParamChange = (ddIndex: number, fieldType: string) => {
    const newParam = params[ddIndex];
    if (param.name !== newParam.name) {
      onLineChange("param", newParam, index);
    }
  };

  const onFieldChange = (ddIndex: number) => {
    const newField = fields[ddIndex];
    if (newField !== field) {
      onLineChange("field", newField, index);
    }
  };
  return (
    <tr>
      <td>{index}</td>
      <td>
        <DropdownButton variant="info" id="dropdown-basic-button" title={field}>
          {fields.map((field, index: number) => (
            <Dropdown.Item
              key={field}
              onClick={(e) => {
                onFieldChange(index);
              }}
            >
              {field}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </td>
      <td>
        <DropdownButton
          variant="info"
          id="dropdown-basic-button"
          title={param.name}
        >
          {params.map((param, index: number) => (
            <Dropdown.Item
              key={param.name}
              onClick={(e) => {
                onParamChange(index, "param");
              }}
            >
              {param.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </td>
    </tr>
  );
}

import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { getFormField } from "../utils/formParser";

export default function FormInfo(props: {
  formUrl: string;
  onFormUrlUpdated: any;
  onFieldsUpdated: any;
}) {
  const { formUrl, onFormUrlUpdated, onFieldsUpdated } = props;
  const updateUrl = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    onFormUrlUpdated(target.value);
  };
  const getFields = async () => {
    const newFields = await getFormField(formUrl);
    onFieldsUpdated(newFields);
  };
  return (
    <Form>
      <Form.Group controlId="formUrl">
        <Form.Label>JotForm Url</Form.Label>
        <Form.Control
          value={formUrl}
          type="text"
          placeholder="Enter form url"
          onChange={updateUrl}
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={getFields}>
        Get Form Fields
      </Button>
    </Form>
  );
}

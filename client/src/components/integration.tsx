import React, { useState, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap";

import { getFormField } from "../utils/formParser";
function IntegrationPage() {
  const [url, setUrl] = useState("");
  const [fields, setFields] = useState(new Array<string>());

  const updateUrl = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };
  const getFields = async () => {
    const newFields = await getFormField(url);
    console.log(newFields);
    setFields(newFields);
  };
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formMessage">
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
      </Row>
    </Container>
  );
}
export default IntegrationPage;

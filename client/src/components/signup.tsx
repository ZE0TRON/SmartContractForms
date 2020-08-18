import { Form, Button, Row, Col, Container } from "react-bootstrap";
import RP from "request-promise";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

export function SignupScreen() {
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as any;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    console.log(email, password);
    const options = {
      method: "POST",
      uri: "https://localhost:8000/account/create",
      body: {
        email: email,
        password: password,
      },
      json: true, // Automatically stringifies the body to JSON
      withCredentials: true,
      jar: true,
    };
    RP(options)
      .then(function (parsedBody) {
        // POST succeeded...
        console.log(parsedBody);
        setErrMessage("" as any);
        history.replace("/form");
      })
      .catch(function (err) {
        // POST failed...
        console.log(err);
        setErrMessage(err.error.err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
          {errMessage}
        </Col>
      </Row>
    </Container>
  );
}

import React, { MouseEvent, useState, useEffect, ChangeEvent } from "react";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";
import RP from "request-promise";

import { FormListingDTO } from "../utils/types";

const SERVER_URL = "https://localhost:8000";

function FormsScreen() {
  const [forms, setForms] = useState(new Array<FormListingDTO>());

  useEffect(() => {
    const options = {
      method: "GET",
      uri: "https://localhost:8000/form/list",
      json: true, // Automatically stringifies the body to JSON
      jar: true,
      withCredentials: true,
    };
    RP(options)
      .then(function (parsedBody) {
        // POST succeeded...
        console.log(parsedBody);
        setForms(parsedBody);
      })
      .catch(function (err) {
        // POST failed...
        // TODO If not logged in navigate to login
        //history.push("/form");
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Form Name</th>
                <th>Url</th>
                <th>JotForm Url</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index: number) => (
                <tr>
                  <td>{form.form_id}</td>
                  <td>{form.name}</td>
                  <td>
                    <a href={SERVER_URL + "/form/" + form.form_id}>
                      {SERVER_URL + "/form/" + form.form_id}
                    </a>
                  </td>
                  <td>
                    <a href={form.jotform_url}>{form.jotform_url}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export default FormsScreen;

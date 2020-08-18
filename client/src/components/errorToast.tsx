import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Button, Row, Col, Container, Toast } from "react-bootstrap";
function ErrorToast(props: {
  err: string;
  showToast: boolean;
  setShowToast: any;
}) {
  const truthyCheck = (val: string) =>
    val !== "" && typeof val !== undefined && val !== null;
  const { err, showToast, setShowToast } = props;
  console.log(showToast);
  return (
    <Toast show={showToast} onClose={() => setShowToast(false)}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Smart Contract Forms</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{err}</Toast.Body>
    </Toast>
  );
}
export default ErrorToast;

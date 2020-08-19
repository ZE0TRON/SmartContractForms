import React, { useState } from "react";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import { FormField } from "../utils/types";
function PaymentIntegration(props: {
  payment: FormField | null;
  setPayment: any;
  fields: FormField[];
}) {
  const { payment, setPayment, fields } = props;
  const [showPaymentField, setShowPaymentField] = useState(false);
  const addPaymentClicked = () => {
    setShowPaymentField(true);
  };
  return (
    <>
      <Button onClick={addPaymentClicked}>Add Payment Integration</Button>
      {showPaymentField && (
        <DropdownButton
          variant="info"
          id="dropdown-basic-button"
          title={(payment && payment.field) || "Select Payment Field"}
        >
          {fields.map((field, index: number) => (
            <Dropdown.Item
              key={field.id}
              onClick={(e) => {
                setPayment(field);
              }}
            >
              {field.field}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
    </>
  );
}
export default PaymentIntegration;

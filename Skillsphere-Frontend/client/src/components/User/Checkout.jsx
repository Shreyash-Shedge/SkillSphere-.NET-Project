import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const { course } = location.state; // Access course data from location state

  const [amount, setAmount] = useState(course.price); // Initialize amount with course price
  const [notification, setNotification] = useState("");

  const initialOptions = {
    clientId: "AZHWfM371ipo_uaXV5sgMOeeBmBxow28t_fngfnEfW8sEpDJ24P_-1cCucbeD-49PnQSvc46IuaEEr8y",
    currency: "USD",
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:5144/api/Checkout/CreateOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: document.getElementById("totalAmount").value,
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData.details[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch(`http://localhost:5144/api/Checkout/CaptureOrder/${data.orderID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const captureData = await response.json();

      if (captureData.status !== "COMPLETED") {
        throw new Error("Payment capture failed");
      }

      alert("Payment successful!");
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto p-4 rounded border shadow" style={{ width: "420px" }}>
      <h2 className="text-center mb-5">Complete your order</h2>

      {/* Display course details */}
      <div className="course-details mb-4">
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p>{course.description}</p>
        <p className="font-bold">Price: ${course.price}</p>
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Total Amount ($)</label>
        <input
          className="form-control"
          type="number"
          id="totalAmount"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
          readOnly
        />
      </div>
      <br />
      <div id="notification-container">{notification}</div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
}

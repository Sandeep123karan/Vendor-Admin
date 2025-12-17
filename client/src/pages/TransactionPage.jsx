





import React, { useState } from "react";
import axios from "axios";
import "./TransactionPage.css";

export default function TransactionPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    const { name, email, amount } = form;

    if (!name || !email || !amount) {
      return alert("Please fill all fields");
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    try {
      // Create order request
      const orderRes = await axios.post(
        "http://localhost:7002/api/payment/create-order",
        { name, email, amount }
      );

      const { key, orderId, currency } = orderRes.data;

      const options = {
        key: key,
        amount: amount * 100,
        currency: currency,
        name: "Havbit",
        description: "Transaction",
        order_id: orderId,

        prefill: {
          name,
          email,
        },

        handler: async function (response) {
          const verifyRes = await axios.post(
            "http://localhost:7002/api/payment/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          alert(verifyRes.data.message);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      {/* <h2>Make a Payment</h2>

      <input
        style={{ marginTop: 10, width: "100%", padding: 8 }}
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
      />

      <input
        style={{ marginTop: 10, width: "100%", padding: 8 }}
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <input
        style={{ marginTop: 10, width: "100%", padding: 8 }}
        type="number"
        name="amount"
        placeholder="Enter Amount"
        onChange={handleChange}
      />

      <button
        style={{
          marginTop: 15,
          padding: "10px",
          width: "100%",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
        onClick={startPayment}
      >
        Pay Now
      </button> */}


      <div className="payment-container">
  <h2>Make a Payment</h2>

  <input
    className="payment-input"
    type="text"
    name="name"
    placeholder="Enter Name"
    onChange={handleChange}
  />

  <input
    className="payment-input"
    type="email"
    name="email"
    placeholder="Enter Email"
    onChange={handleChange}
  />

  <input
    className="payment-input"
    type="number"
    name="amount"
    placeholder="Enter Amount"
    onChange={handleChange}
  />

  <button className="pay-btn" onClick={startPayment}>
    Pay Now
  </button>
</div>

    </div>
  );
}


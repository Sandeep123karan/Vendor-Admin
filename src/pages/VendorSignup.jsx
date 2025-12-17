

import React, { useState } from "react";
import axios from "axios";

export default function VendorSignup() {
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7002/api/vendor/add-vendor", { name, shop, email, phone, password });
      alert("Vendor registered successfully!");
      window.location.href = "/vendorlogin";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vendor Signup</h2>
      <form onSubmit={submit} style={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Shop Name" value={shop} onChange={e => setShop(e.target.value)} required style={styles.input} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
        <button type="submit" style={styles.button}>Signup</button>
        <p style={{ marginTop: "15px" }}>
          Already have an account? <a href="/vendorlogin">Login here</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "50px", maxWidth: "400px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center", backgroundColor: "#fff" },
  title: { marginBottom: "30px", color: "#ff4d4d" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
  button: { padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#ff4d4d", color: "#fff", fontSize: "16px", cursor: "pointer", transition: "0.3s" }
};

import React, { useState } from "react";
import axios from "axios";

export default function VendorKYC() {
  const [form, setForm] = useState({
    shopName: "",
    address: "",
    email: "",
    phone: "",
    gmail: "",
    fssai: "",
  });

  const [shopPhoto, setShopPhoto] = useState(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [panPhoto, setPanPhoto] = useState(null);
  const [fssaiPhoto, setFssaiPhoto] = useState(null);

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("shopName", form.shopName);
    data.append("address", form.address);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("gmail", form.gmail);
    data.append("fssai", form.fssai);

    if (shopPhoto) data.append("shopPhoto", shopPhoto);
    if (aadhaarPhoto) data.append("aadhaarPhoto", aadhaarPhoto);
    if (panPhoto) data.append("panPhoto", panPhoto);
    if (fssaiPhoto) data.append("fssaiPhoto", fssaiPhoto);

    try {
      const token = localStorage.getItem("vendorToken");
      await axios.post("http://localhost:7002/api/vendor/update-profile", FormData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});


    //   await axios.post("http://localhost:7002/api/vendor/update-profile", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

      alert("Vendor KYC Submitted Successfully!");
      window.location.href = "/vendor/dashboard";

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vendor KYC Form</h2>

      <form onSubmit={submit} style={styles.form}>

        <input type="text" name="shopName" placeholder="Shop Name"
          value={form.shopName} onChange={updateForm} required style={styles.input} />

        <input type="text" name="address" placeholder="Full Address"
          value={form.address} onChange={updateForm} required style={styles.input} />

        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={updateForm} required style={styles.input} />

        <input type="text" name="phone" placeholder="Phone"
          value={form.phone} onChange={updateForm} required style={styles.input} />

        <input type="email" name="gmail" placeholder="Gmail ID"
          value={form.gmail} onChange={updateForm} required style={styles.input} />

        <input type="text" name="fssai" placeholder="FSSAI Number"
          value={form.fssai} onChange={updateForm} required style={styles.input} />

        <label>Shop Photo</label>
        <input type="file" onChange={(e) => setShopPhoto(e.target.files[0])} style={styles.input} />

        <label>FSSAI Certificate Photo</label>
        <input type="file" onChange={(e) => setFssaiPhoto(e.target.files[0])} style={styles.input} />

        <label>Aadhaar Card Photo</label>
        <input type="file" onChange={(e) => setAadhaarPhoto(e.target.files[0])} style={styles.input} />

        <label>PAN Card Photo</label>
        <input type="file" onChange={(e) => setPanPhoto(e.target.files[0])} style={styles.input} />

        <button type="submit" style={styles.button}>Submit KYC</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "500px",
    margin: "30px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff"
  },
  title: { marginBottom: "20px", color: "#ff4d4d", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Vendors.css";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", shop: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:7002/vendor"; // Backend route

  // Load all vendors
  const loadVendors = async () => {
    try {
      const res = await axios.get(API);
      setVendors(res.data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add vendor
  const handleAddVendor = async () => {
    try {
      await axios.post(API, form);
      setForm({ name: "", shop: "", email: "", phone: "" });
      loadVendors();
    } catch (err) {
      console.error("Error adding vendor:", err);
    }
  };

  // Edit vendor
  const handleEditVendor = (vendor) => {
    setEditingId(vendor._id);
    setForm({
      name: vendor.name,
      shop: vendor.shop ,
      email: vendor.email,
      phone: vendor.phone,
    });
  };

  // Update vendor
  const handleUpdateVendor = async () => {
    try {
      await axios.put(`${API}/${editingId}`, form);
      setEditingId(null);
      setForm({ name: "", shop: "", email: "", phone: "" });
      loadVendors();
    } catch (err) {
      console.error("Error updating vendor:", err);
    }
  };

  // Delete vendor
  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadVendors();
    } catch (err) {
      console.error("Error deleting vendor:", err);
    }
  };

  return (
    <div className="page">
      <h2>Vendor Management</h2>

      <div className="form-box">
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="shop"
          placeholder="Shop Name"
          value={form.shop}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        {editingId ? (
          <button onClick={handleUpdateVendor} className="save-btn">
            Update
          </button>
        ) : (
          <button onClick={handleAddVendor} className="add-btn">
            Add
          </button>
        )}
      </div>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shop</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.shop }</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditVendor(v)}>
                  Edit
                </button>
                <button className="del-btn" onClick={() => handleDeleteVendor(v._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

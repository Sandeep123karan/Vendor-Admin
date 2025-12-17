

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrdersPage.css";

const API = axios.create({
  baseURL: "http://localhost:7002/api",
});

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editOrder, setEditOrder] = useState(null);

  // FORM FIELDS
  const [orderId, setOrderId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // RESET FORM
  const clearForm = () => {
    setEditOrder(null);
    setOrderId("");
    setUserName("");
    setUserEmail("");
    setProductsList([]);
    setStatus("Pending");
    setTotalAmount("");
  };

  // OPEN FORM FOR EDIT
  const handleEdit = (o) => {
    setEditOrder(o);
    setOrderId(o._id);
    setUserName(o.user?.name);
    setUserEmail(o.user?.email);
    setProductsList(o.products);
    setStatus(o.status);
    setTotalAmount(o.totalAmount);

    setShowForm(true);
  };

  // SAVE UPDATED ORDER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/orders/${editOrder._id}`, {
        status,
        totalAmount,
      });

      fetchOrders();
      clearForm();
      setShowForm(false);
      alert("Order Updated!");
    } catch (error) {
      console.log(error);
      alert("Error updating order");
    }
  };

  // DELETE ORDER
  const handleDelete = async (id) => {
    if (!window.confirm("Delete order?")) return;

    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      alert("Error deleting order");
    }
  };

  // PRINT ORDER
  const handlePrint = (order) => {
    if (!order) return alert("Order not found!");

    const printWindow = window.open("", "", "width=900,height=900");

    const productHTML =
      order.products
        ?.map(
          (p) => `
        <tr>
          <td>${p.product?.name}</td>
          <td>${p.quantity}</td>
          <td>₹${p.product?.price}</td>
          <td>₹${p.quantity * p.product?.price}</td>
        </tr>
      `
        )
        .join("") || "";

    printWindow.document.write(`
      <html>
      <head>
        <title>Order Invoice</title>

        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background: #f0f0f0; }
          .info-box { margin-top: 20px; }
          .total { font-size: 20px; font-weight: bold; margin-top: 20px; text-align: right; }
        </style>
      </head>

      <body>

        <h1>Order Invoice</h1>

        <div class="info-box">
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>User:</strong> ${order.user?.name}</p>
          <p><strong>Email:</strong> ${order.user?.email}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Order Date:</strong> ${new Date(order.orderedAt).toLocaleString()}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            ${productHTML}
          </tbody>
        </table>

        <div class="total">
          Grand Total: ₹${order.totalAmount}
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>

      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="orders-container">
      <h1 className="title">Manage Orders</h1>

      {/* TOGGLE FORM BUTTON */}
      <button
        className="btn-add-toggle"
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) clearForm();
        }}
      >
        {showForm ? "Close Form" : "Add Order"}
      </button>

      {/* ORDER FORM */}
      {showForm && (
        <div className="form-card">
          <h3>{editOrder ? "Update Order" : "Add New Order"}</h3>

          <form onSubmit={handleSubmit}>
            <label>Order ID</label>
            <input type="text" value={orderId} disabled />

            <label>User Name</label>
            <input type="text" value={userName} disabled />

            <label>User Email</label>
            <input type="text" value={userEmail} disabled />

            <label>Products</label>
            <div className="product-box">
              {productsList.length === 0 ? (
                <p>No Products</p>
              ) : (
                productsList.map((p, i) => (
                  <div key={i} className="product-item">
                    <img src={p.product?.image} alt="" />
                    <span>{p.product?.name} (x{p.quantity})</span>
                  </div>
                ))
              )}
            </div>

            <label>Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />

            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button className="btn-submit" type="submit">
              {editOrder ? "Update Order" : "Add Order"}
            </button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>
              <td>{o.user?.name}</td>
              <td>{o.user?.email}</td>

              <td>
                <div className="product-images">
                  {o.products.map((p, i) => (
                    <div key={i} className="product-image-item">
                      <img src={p.product?.image} alt="" />
                      <span>{p.product?.name} (x{p.quantity})</span>
                    </div>
                  ))}
                </div>
              </td>

              <td>{o.totalAmount}</td>
              <td>{o.status}</td>

              <td className="actions-col">
                <button className="btn-edit" onClick={() => handleEdit(o)}>
                  Edit
                </button>

                <button className="btn-delete" onClick={() => handleDelete(o._id)}>
                  Delete
                </button>

                {/* PRINT FIXED */}
                <button className="btn-Print" onClick={() => handlePrint(o)}>
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



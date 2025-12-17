
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:7002/api/orders/history/all");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // --------------------- EXPORT CSV ---------------------
  const exportCSV = () => {
    if (history.length === 0) return alert("No data to export!");

    let csv = "User,Product,Quantity,Status,OrderedAt,CancelledAt,CancelledBy\n";

    history.forEach((order) => {
      order.products.forEach((p) => {
        csv += `${order?.user?.name},${p.product?.name},${p.quantity},${order.status},${order.orderedAt},${order.cancelledAt || "-"},${order.cancelledBy?.name || "-"}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "order_history.csv";
    link.click();
  };

  // --------------------- IMPORT CSV ---------------------
  const importCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:7002/api/orders/import", formData);
      alert("Import Successful!");
      fetchHistory();
    } catch (err) {
      console.log(err);
      alert("Import Failed");
    }
  };

  return (
    <div className="history-container">
      <h1>Order History</h1>

      {/* -------- Buttons -------- */}
      <div className="btn-section">
        <button className="btn export-btn" onClick={exportCSV}>Export CSV</button>

        <label className="btn import-btn">
          Import CSV
          <input type="file" accept=".csv" onChange={importCSV} hidden />
        </label>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Status</th>
            <th>Ordered At</th>
            <th>Cancelled At</th>
            <th>Cancelled By</th>
          </tr>
        </thead>

        <tbody>
          {history.map((order) => (
            <tr key={order._id}>
              <td>{order?.user?.name}</td>

              <td>
                {order.products.map((p) => (
                  <div key={p._id}>
                    {p.product?.name} (x{p.quantity})
                  </div>
                ))}
              </td>

              <td>{order.status}</td>

              <td>{new Date(order.orderedAt).toLocaleString()}</td>

              <td>
                {order.cancelledAt
                  ? new Date(order.cancelledAt).toLocaleString()
                  : "-"}
              </td>

              <td>{order.cancelledBy?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

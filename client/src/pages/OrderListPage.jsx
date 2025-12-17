// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./OrderListPage.css";

// const API = axios.create({
//   baseURL: "http://localhost:7002/api",
// });

// export default function OrderListPage() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await API.get("/orders");
//       setOrders(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // DELETE Order
//   const deleteOrder = async (id) => {
//     if (!window.confirm("Delete this order?")) return;

//     try {
//       await API.delete(`/orders/${id}`);
//       fetchOrders();
//     } catch (err) {
//       alert("Error deleting");
//     }
//   };

//   return (
//     <div className="orderlist-container">
//       <h1 className="title">Order List</h1>

//       <table className="orderlist-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Email</th>
//             <th>Total Amount</th>
//             <th>Status</th>
//             <th>Products</th>
//             <th style={{ textAlign: "center" }}>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order._id.slice(-6)}</td>
//               <td>{order.user?.name}</td>
//               <td>{order.user?.email}</td>
//               <td>₹{order.totalAmount}</td>
//               <td>{order.status}</td>

//               <td>
//                 {order.products.map((p, i) => (
//                   <div key={i} className="order-product-item">
//                     <img src={p.product?.image} alt="" />
//                     <span>{p.product?.name} (x{p.quantity})</span>
//                   </div>
//                 ))}
//               </td>

//               <td className="actions-col">
//                 <button
//                   className="btn-view"
//                   onClick={() => alert("Add View Order Page Later")}
//                 >
//                   View
//                 </button>

//                 <button
//                   className="btn-del"
//                   onClick={() => deleteOrder(order._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderListPage.css";

const API = axios.create({
  baseURL: "http://localhost:7002/api",
});

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // DELETE Order
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      alert("Error deleting");
    }
  };

  // PRINT Order
  const printOrder = (order) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Order Print</title>");
    printWindow.document.write(
      `<style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        img { width: 50px; height: 50px; object-fit: cover; margin-right: 10px; }
        .product-item { display: flex; align-items: center; margin-bottom: 5px; }
      </style>`
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(`<h1>Order ${order._id.slice(-6)}</h1>`);
    printWindow.document.write(`<p><strong>User:</strong> ${order.user?.name}</p>`);
    printWindow.document.write(`<p><strong>Email:</strong> ${order.user?.email}</p>`);
    printWindow.document.write(`<p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>`);
    printWindow.document.write(`<p><strong>Status:</strong> ${order.status}</p>`);

    printWindow.document.write("<h2>Products:</h2>");
    printWindow.document.write("<div>");
    order.products.forEach((p) => {
      printWindow.document.write(
        `<div class="product-item">
          <img src="${p.product?.image}" alt="${p.product?.name}" />
          <span>${p.product?.name} (x${p.quantity})</span>
        </div>`
      );
    });
    printWindow.document.write("</div>");

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="orderlist-container">
      <h1 className="title">Order List</h1>

      <table className="orderlist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Products</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.user?.name}</td>
              <td>{order.user?.email}</td>
              <td>₹{order.totalAmount}</td>
              <td>{order.status}</td>

              <td>
                {order.products.map((p, i) => (
                  <div key={i} className="order-product-item">
                    <img src={p.product?.image} alt="" />
                    <span>{p.product?.name} (x{p.quantity})</span>
                  </div>
                ))}
              </td>

              <td className="actions-col">
                <button
                  className="btn-view"
                  onClick={() => alert("Add View Order Page Later")}
                >
                  View
                </button>

                <button
                  className="btn-del"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </button>

                <button
                  className="btn-print"
                  onClick={() => printOrder(order)}
                >
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

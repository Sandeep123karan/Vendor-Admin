



// // // import React from "react";
// // // import "./Dashboard.css";




// // // export default function Dashboard() {
// // //   return (
// // //     <div className="main-content">

// // //       {/* ⭐ TOP ROW (Sales + Report) */}
// // //       <div className="top-row">

// // //         {/* 🔥 ONE BIG CARD → Sales + Orders inside */}
// // //         <div className="card sales-main-card">

// // //           <h3>Total Sales</h3>
// // //           <h2>INR 350K</h2>
// // //           <span className="green">+10.4%</span>

// // //           <div className="sub-card">
// // //             <p>Total Orders</p>
// // //             <h2>1,240</h2>
// // //             <span className="green">+10.4%</span>
// // //           </div>

// // //         </div>

// // //         {/* 🔥 Report This Week card (shifted to right) */}
// // //         import 
// // //         <div className="card report-card">
// // //           <h3>Report This Week</h3>
// // //           <img 
// // //             src="https://i.ibb.co/4S7FJQ1/graph.jpg"
// // //             alt="Graph"
// // //             className="graph-img"
// // //           />
// // //         </div>

// // //       </div>

// // //       {/* ⭐ TABLE BELOW */}
// // //       <div className="orders-table">
// // //         <h3>Recent Orders</h3>

// // //         <table>
// // //           <thead>
// // //             <tr>
// // //               <th>Order ID</th>
// // //               <th>Status</th>
// // //               <th>Total</th>
// // //               <th>Date</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             <tr>
// // //               <td>#1201</td>
// // //               <td className="delivered">Delivered</td>
// // //               <td>₹1,450</td>
// // //               <td>2 Dec</td>
// // //             </tr>

// // //             <tr>
// // //               <td>#1202</td>
// // //               <td className="pending">Pending</td>
// // //               <td>₹980</td>
// // //               <td>3 Dec</td>
// // //             </tr>
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //     </div>
// // //   );
// // // }











// // import React from "react";
// // import "./Dashboard.css";
// // import graphImg from "../components/8.png.png";
// //  // <-- Correct image path

// // export default function Dashboard() {
// //   return (
// //     <div className="main-content">

// //       {/* ⭐ TOP ROW (Sales + Report) */}
// //       <div className="top-row">

// //         {/* 🔥 ONE BIG CARD → Sales + Orders inside */}
// //         <div className="card sales-main-card">

// //           <h3>Total Sales</h3>
// //           <h2>INR 350K</h2>
// //           <span className="green">+10.4%</span>

// //           <div className="sub-card">
// //             <p>Total Orders</p>
// //             <h2>1,240</h2>
// //             <span className="green">+10.4%</span>
// //           </div>

// //         </div>

// //         {/* 🔥 Report This Week card */}
// //         <div className="card report-card">
// //           <h3>Report This Week</h3>

// //           <img 
// //             src={graphImg}
// //             alt="Graph"
// //             className="graph-img"
// //           />
// //         </div>

// //       </div>

// //       {/* ⭐ TABLE BELOW */}
// //       <div className="orders-table">
// //         <h3>Recent Orders</h3>

// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Order ID</th>
// //               <th>Status</th>
// //               <th>Total</th>
// //               <th>Date</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             <tr>
// //               <td>#1201</td>
// //               <td className="delivered">Delivered</td>
// //               <td>₹1,450</td>
// //               <td>2 Dec</td>
// //             </tr>

// //             <tr>
// //               <td>#1202</td>
// //               <td className="pending">Pending</td>
// //               <td>₹980</td>
// //               <td>3 Dec</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>

// //     </div>
// //   );
// // }
// import React from "react";
// import { motion } from "framer-motion";
// import "./Dashboard.css";
// import graphImg from "../components/8.png.png";

// export default function Dashboard() {
//   return (
//     <motion.div 
//       className="main-content"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >

//       {/* ⭐ TOP ROW */}
//       <div className="top-row">

//         {/* 🔥 Animated Big Card */}
//         <motion.div 
//           className="card sales-main-card"
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           whileHover={{ scale: 1.03 }}
//         >
//           <h3>Total Sales</h3>
//           <motion.h2 
//             initial={{ scale: 0.7 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             INR 350K
//           </motion.h2>
//           <span className="green">+10.4%</span>

//           <motion.div 
//             className="sub-card"
//             whileHover={{ scale: 1.03, x: 10 }}
//           >
//             <p>Total Orders</p>
//             <h2>1,240</h2>
//             <span className="green">+10.4%</span>
//           </motion.div>
//         </motion.div>

//         {/* ⭐ Animated Report Card */}
//         <motion.div 
//           className="card report-card"
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           whileHover={{ scale: 1.02, rotate: 1 }}
//         >
//           <h3>Report This Week</h3>

//           <motion.img
//             src={graphImg}
//             alt="Graph"
//             className="graph-img"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.div>

//       </div>

//       {/* ⭐ Animated Orders Table */}
//       <motion.div 
//         className="orders-table"
//         initial={{ y: 60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//       >
//         <h3>Recent Orders</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Status</th>
//               <th>Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             <motion.tr 
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <td>#1201</td>
//               <td className="delivered">Delivered</td>
//               <td>₹1,450</td>
//               <td>2 Dec</td>
//             </motion.tr>

//             <motion.tr 
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <td>#1202</td>
//               <td className="pending">Pending</td>
//               <td>₹980</td>
//               <td>3 Dec</td>
//             </motion.tr>
//           </tbody>
//         </table>
//       </motion.div>

//     </motion.div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

const data = [
  { name: "Mon", sales: 3000 },
  { name: "Tue", sales: 4500 },
  { name: "Wed", sales: 3200 },
  { name: "Thu", sales: 5000 },
  { name: "Fri", sales: 3900 },
  { name: "Sat", sales: 6100 },
  { name: "Sun", sales: 4800 },
];

export default function Dashboard() {
  return (
    <motion.div 
      className="dash-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >

      {/* TOP CARDS */}
      <div className="dashboard-row">

        <motion.div 
          className="dash-card red-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Total Sales</h3>
          <h2>₹ 350K</h2>
          <span className="increase">+10.4%</span>
        </motion.div>

        <motion.div 
          className="dash-card blue-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Total Orders</h3>
          <h2>1,240</h2>
          <span className="increase">+8.1%</span>
        </motion.div>

        <motion.div 
          className="dash-card white-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Active Vendors</h3>
          <h2>320</h2>
          <span className="increase">+5.3%</span>
        </motion.div>

      </div>

      {/* BAR GRAPH SECTION */}
      <motion.div 
        className="graph-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title">Weekly Sales (Bar Graph)</h3>

        <ResponsiveContainer width="100%" height={330}>
          <BarChart data={data} margin={{ top: 20 }}>
            <CartesianGrid strokeDasharray="4 4" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="sales" 
              fill="#2563eb" 
              animationDuration={1200}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* TABLE SECTION */}
      <motion.div 
        className="orders-table"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="section-title">Recent Orders</h3>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <motion.tr whileHover={{ scale: 1.02 }}>
              <td>#1201</td>
              <td className="delivered">Delivered</td>
              <td>₹ 1450</td>
              <td>2 Dec</td>
            </motion.tr>

            <motion.tr whileHover={{ scale: 1.02 }}>
              <td>#1202</td>
              <td className="pending">Pending</td>
              <td>₹ 980</td>
              <td>3 Dec</td>
            </motion.tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

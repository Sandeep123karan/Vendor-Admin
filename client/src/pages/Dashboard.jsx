
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

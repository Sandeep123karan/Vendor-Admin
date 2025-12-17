












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../components/assets/2.png";
import logo from "../assets/2.png";

import Vendors from "../pages/Vendors.jsx";
 // adjust path if needed

import {
  FiHome,
  FiUsers,
  FiLayers,
  FiBox,
  FiList,
  FiShoppingCart,
  FiClock,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "./AdminLayout.css";

import DashboardHome from "./Dashboard.jsx";
import AdminOrdersPage from "./AdminOrdersPage.jsx";
import OrderListPage from "./OrderListPage.jsx";
import UsersPage from "./UsersPage.jsx";
import Categories from "./Categories.jsx";
import SubCategories from "./SubCategories.jsx.";
import AdminProductPage from "./AdminProductPage.jsx";
import ProductList from "./ProductList.jsx";
import OrderHistory from "./OrderHistory.jsx";
import Setting from "./Setting.jsx";

export default function AdminLayout() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);
  const navigate = useNavigate();

  // Detect screen resize
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 820);
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const menu = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Order Management", icon: <FiShoppingCart /> },
    { name: "Order List", icon: <FiList /> },
    { name: "Users", icon: <FiUsers /> },
    { name: "Categories", icon: <FiLayers /> },
    { name: "Sub-Categories", icon: <FiLayers /> },
    { name: "Products", icon: <FiBox /> },
    { name: "ProductList", icon: <FiBox /> },
    { name: "History", icon: <FiClock /> },
    { name: "Setting", icon: <FiSettings /> },
    { name: "Vendors", icon: <FiUsers /> },

    { name: "Logout", icon: <FiLogOut /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "Dashboard": return <DashboardHome />;
      case "Order Management": return <AdminOrdersPage />;
      case "Order List": return <OrderListPage />;
      case "Users": return <UsersPage />;
      case "Categories": return <Categories />;
      case "Sub-Categories": return <SubCategories />;
      case "Products": return <AdminProductPage />;
      case "ProductList": return <ProductList />;
      case "History": return <OrderHistory />;
      case "Setting": return <Setting />;
      case "Vendors": return <Vendors />;

      default: return <DashboardHome />;
    }
  };

  return (
    <div className="layout">

      {/* Hamburger */}
      <div
        className={`hamburger ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="side-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <div>Admin Panel</div>
        </div>

        {menu.map((item) => (
          <div
            key={item.name}
            className={`menu-item ${active === item.name ? "active" : ""}`}
            onClick={() => {
              if (item.name === "Logout") {
                localStorage.removeItem("token");
                navigate("/login");
              } else {
                setActive(item.name);
              }
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </aside>

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="main">{renderContent()}</main>
    </div>
  );
}







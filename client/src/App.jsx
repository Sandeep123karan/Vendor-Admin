import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import VendorLogin from './pages/VendorLogin';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Signup from "./pages/Signup";
import OrderHistory from './pages/OrderHistory';
import AdminLayout from './pages/AdminLayout';
import VendorKYC from "./pages/VendorKYC"; 


import ProductList from "./pages/ProductList";
import OrderListPage from "./pages/OrderListPage";
import Setting from "./pages/Setting";
import VendorSignup from "./pages/VendorSignup"; // add this import

<Routes>
  <Route path="/vendorlogin" element={<VendorLogin />} />
  <Route path="/vendorsignup" element={<VendorSignup />} />  {/* NEW */}
</Routes>









function App(){
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/VendorLogin" element = {<VendorLogin/>}/>
        <Route path="/vendorlogin" element={<VendorLogin />} />
  <Route path="/vendorsignup" element={<VendorSignup />} />
  <Route path="/vendor/profile-setup" element={<VendorKYC />} />


        <Route path="/VendorLogin" element = {<VendorLogin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/orderhistory' element={<OrderHistory />}/>
        <Route path='/' element={<Navigate to='/login' replace/>} />
        <Route path='/AdminLayout' element={<AdminLayout/>} />
        <Route path='/ProductList' element={<ProductList/>} />
        <Route path="/admin/order-list" element={<OrderListPage />} />
          <Route path="/pages/Setting" element={<Setting/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

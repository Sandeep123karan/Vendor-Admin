import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import VendorLogin from './pages/VendorLogin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Categories from './pages/Categories.jsx';
import Signup from "./pages/Signup.jsx";
import OrderHistory from './pages/OrderHistory.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import VendorKYC from "./pages/VendorKYC.jsx"; 


import ProductList from "./pages/ProductList.jsx";
import OrderListPage from "./pages/OrderListPage.jsx";
import Setting from "./pages/Setting.jsx";
import VendorSignup from "./pages/VendorSignup.jsx"; // add this import

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

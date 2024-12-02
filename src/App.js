// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import AuthenticateForm from './components/AuthenticateForm';

import Profile from './components/Profile';
import CompanyProfileComponent from './components/CompanyProfileComponent';
import Home from './components/Home';
import CategoryListComponent from './components/ListComponents/CategoryListComponent';
import Footer from './components/Footer';

import ProductListComponent from './components/ListComponents/ProductListComponent';

// Страницы
import ProductPageComponent from './components/PageComponents/ProductPageComponent';
import CompanyPageComponent from './components/PageComponents/CompanyPageComponent';

import CompanySettingsComponent from './components/CompanySettingsComponent';

import ControlPanelComponent from './components/HandleComponents/ControlPanelComponent';
import HandleCategoryComponent from './components/HandleComponents/HandleCategoryComponent';
import HandleCouponComponent from './components/HandleComponents/HandleCouponComponent';
import HandleProductComponent from './components/HandleComponents/HandleProductComponent';
import HandlePromotionComponent from './components/HandleComponents/HandlePromotionComponent';
import HandleReviewComponent from './components/HandleComponents/HandleReviewComponent';
import HandleUserComponent from './components/HandleComponents/HandleUserComponent';
import HandleCompanyComponent from './components/HandleComponents/HandleCompanyComponent';
import AddCompanyComponent from './components/AddCompanyComponent';

import AddProductComponent from './components/AddProductComponent';
import AddCouponComponent from './components/AddCouponComponent';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Header/>
      </header>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/reg" element={<RegisterForm/>}/>
          <Route path="/auth" element={<AuthenticateForm/>}/>

          <Route path="/profile" element={<Profile/>}/>
          <Route path="/company-profile" element={<CompanyProfileComponent/>}/>
          <Route path="/company-profile/:companyId" element={<CompanyProfileComponent/>}/> 

          <Route path="/category" exact element={<CategoryListComponent/>}/>

          <Route path="/category/:categoryId" element={<ProductListComponent/>}/>
          <Route path="/product/:productId" element={<ProductPageComponent/>}/>
          <Route path="/company/:companyId" element={<CompanyPageComponent/>}/>
          <Route path="/promotion/:companyId" element={<HandlePromotionComponent/>}/>
          <Route path="/coupon/:companyId" element={<HandleCouponComponent/>}/>
          
          <Route path="/company-settings/:companyId" element={<CompanySettingsComponent/>}/>
          <Route path="/company-add" element={<AddCompanyComponent/>}/>

          <Route path="/addproduct" element={<AddProductComponent/>}/>
          <Route path="/addcoupon" element={<AddCouponComponent/>}/>

          <Route path="control-panel" element={<ControlPanelComponent/>}/>
          <Route path="handle-category" element={<HandleCategoryComponent/>}/>
          <Route path="handle-coupon" element={<HandleCouponComponent/>}/>
          <Route path="handle-product" element={<HandleProductComponent/>}/>
          <Route path="handle-promotion" element={<HandlePromotionComponent/>}/>
          <Route path="handle-review" element={<HandleReviewComponent/>}/>
          <Route path="handle-user" element={<HandleUserComponent/>}/>
          <Route path="handle-company" element={<HandleCompanyComponent/>}/>
        </Routes>
      </Router>
      <footer>
          <Footer/>
        </footer>
    </div>
  );
}

export default App;

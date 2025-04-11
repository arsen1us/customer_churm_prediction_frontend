import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from './components/HeaderComponent/Header';
import RegisterForm from './components/RegisterFormComponent/RegisterForm';
import AuthenticateForm from './components/AuthenticateFormComponent/AuthenticateForm';
import Profile from './components/ProfileComponent/Profile';
import ProfileEditForm from './components/FormComponents/Profile/ProfileEditForm';
import CompanyProfile from './components/CompanyProfileComponent/CompanyProfile';
import HomePage from './components/HomePageComponent/HomePage';
import CategoryList from './components/ListComponents/CategoryList';
import Footer from './components/FooterComponent/Footer'
import ProductList from './components/ListComponents/ProductList';
import ProductPage from './components/PageComponents/ProductPage';
import CompanySettings from './components/SettingsComponents/CompanySettingsComponent/CompanySettings';
import ControlPanel from './components/ManagerComponents/ControlPanelComponent/ControlPanel';
import CategoryManager from './components/ManagerComponents/CategoryManagerComponent/CategoryManager';
import ProductManager from './components/ManagerComponents/ProductManagerComponent/ProductManager';
import PromotionManager from './components/ManagerComponents/PromotionManagerComponent/PromotionManager';
import ReviewManager from './components/ManagerComponents/ReviewManagerComponent/ReviewManager';
import UserManager from './components/ManagerComponents/UserManagerComponent/UserManager';
import CompanyManager from './components/ManagerComponents/CompanyManagerComponent/CompanyManager';
import CompanyAddForm from './components/FormComponents/Company/CompanyAddForm';
import ProductAddForm from './components/FormComponents/Product/ProductAddForm';
import CouponAddForm from './components/FormComponents/Coupon/CouponAddForm';
import CartPage from './components/PageComponents/CartPage';
import ChurnPredictionPage from './components/PageComponents/ChurnPredictionPageComponent/ChurnPredictionPage';
import NotificationList from './components/ListComponents/NotificationList';
import usePageTracking from './hooks/usePageTracking';
import useSignalR from './hooks/useSignalR';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

import TeaCatalog from './components/TeaCatalogComponent/TeaCatalog';
import AboutUs from './components/AboutUsComponent/AboutUs';

function App() {
  usePageTracking();
  useSignalR();

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/reg" element={<RegisterForm/>}/>
          <Route path="/auth" element={<AuthenticateForm/>}/>

          <Route path="/profile" element={<Profile/>}/>
          <Route path="/edit-profile" element={<ProfileEditForm/>}/>

          <Route path="/company" element={<CompanyProfile/>}/> 
          <Route path="/company/:companyId" element={<CompanyProfile/>}/>

          <Route path="/catalog" element={<TeaCatalog/>}/>

          <Route path="about" element={<AboutUs/>}/>

          <Route path="/category" exact element={<CategoryList/>}/>

          <Route path="/category/:categoryId" element={<ProductList/>}/>
          <Route path="/product/:productId" element={<ProductPage/>}/>
          <Route path="/promotion/:companyId" element={<PromotionManager/>}/>
          
          
          <Route path="/company-settings/:companyId" element={<CompanySettings/>}/>
          <Route path="/company-add" element={<CompanyAddForm/>}/>

          <Route path="/addproduct" element={<ProductAddForm/>}/>
          <Route path="/addcoupon" element={<CouponAddForm/>}/>

          <Route path="control-panel" element={<ControlPanel/>}/>
          <Route path="handle-category" element={<CategoryManager/>}/>
          <Route path="handle-product" element={<ProductManager/>}/>
          <Route path="handle-promotion" element={<PromotionManager/>}/>
          <Route path="handle-review" element={<ReviewManager/>}/>
          <Route path="handle-user" element={<UserManager/>}/>
          <Route path="handle-company" element={<CompanyManager/>}/>

          <Route path="/cart" element={<CartPage/>}/>

          <Route path="/churn-prediction" element={<ChurnPredictionPage/>}/>
          
          <Route path="/notifications" element={<NotificationList/>}/>

        </Routes>
      <footer>
          <Footer/>
        </footer>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import AboutUs from './components/AboutUsComponent/AboutUs';
import AuthenticateForm from './components/AuthenticateFormComponent/AuthenticateForm';
import Cart from './components/CartComponent/Cart';
import Confidentiality from './components/Confidentiality/Confidentiality';
import Contacts from './components/ContactsComponent/Contacts';
import CategoryCreateForm from './components/FormComponents/Category/CategoryCreateFormComponent/CategoryCreateForm';
import Footer from './components/FooterComponent/Footer';
import Header from './components/HeaderComponent/Header';
import HomePage from './components/HomePageComponent/HomePage';
import MakingOrder from './components/MakingOrderComponent/MakingOrder';
import Orders from './components/OrdersComponent/Orders';
import Promotions from './components/PromotionsComponent/Promotions';
import Payment from './components/PaymentComponent/Payment';
import PersonalOrderCreateForm from './components/FormComponents/PersonalOrderCreateFormComponent/PersonalOrderCreateForm';
import ProfileEditForm from './components/FormComponents/Profile/ProfileEditForm';
import Profile from './components/ProfileComponent/Profile';
import RegisterForm from './components/RegisterFormComponent/RegisterForm';
import TeaCatalog from './components/TeaCatalogComponent/TeaCatalog';
import TeaPage from './components/TeaPageComponent/TeaPage';
import TeaCreateForm from './components/FormComponents/Tea/TeaCreateFormComponent/TeaCreateForm';

import usePageTracking from './hooks/usePageTracking';
import useSignalR from './hooks/useSignalR';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

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
          <Route path="/auth" element={<AuthenticateForm/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/edit-profile" element={<ProfileEditForm/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/catalog" element={<TeaCatalog/>}/>
          <Route path="/category-add" element={<CategoryCreateForm/>}/>
          <Route path="/confidentiality" element={<Confidentiality/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/making-order" element={<MakingOrder/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/personal-order" element={<PersonalOrderCreateForm/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/promotions" element={<Promotions/>}/>
          <Route path="/reg" element={<RegisterForm/>}/>
          <Route path="/tea-add" element={<TeaCreateForm/>}/>
          <Route path="/tea/:teaId" element={<TeaPage/>}/>
        </Routes>
      <footer>
          <Footer/>
        </footer>
    </div>
  );
}

export default App;

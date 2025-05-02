import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthProvider"
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./HomePage.css"
// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const HomePage = () => {
    return (
        <div className="container-fluid p-0">
          {/* Герой-блок с фоновым изображением */}
          <div className="position-relative vh-100">
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
              style={{
                backgroundImage: 'url(/home_page_background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
              <h1 className="display-3 fw-bold mb-4">ЧАЙ ЖИГУЛЕВСКИХ ГОР</h1>
              <div className="mb-5">
                <p className="h2 mb-0">Жигулевское</p>
                <p className="h2">лукоморье</p>
              </div>
              <Link to="/about" className="btn btn-primary btn-lg px-4 py-2">О нас</Link>
            </div>
          </div>
    
          {/* Блок "О нас" */}
          <div className="row g-0 my-5">
            <div className="col-md-6">
              <img src="/selo_shiryaevo.jpg" alt="Чайная мастерская" className="img-fluid w-100 h-100 object-fit-cover" />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="p-5">
                <h2 className="display-5 mb-4">О нас</h2>
                <p className="lead mb-4">
                  Наша творческая чайная мастерская объединяет группу единомышленников увлеченных общей идеей — созданием лучших травяных чаев (напитков) для настоящих ценителей и поклонников русского чаепития. Созданием травяных чаев мы занимаемся около семи лет. Значительная часть времени ушла на получение настоящего хорошего чайного продукта, который имеет стабильные качественно-вкусовые показатели которые отвечали нашим требованиям.
                </p>
                <div className="border-top border-2 border-dark my-4 w-25"></div>
                <Link to="/about" className="btn btn-outline-dark btn-lg">Подробнее</Link>
              </div>
            </div>
          </div>
    
          {/* Блок с преимуществами */}
          <div className="bg-light py-5">
            <div className="container text-center">
              <h2 className="display-5 mb-3">Почему вы должны попробовать наш чай?</h2>
              <p className="lead mb-5">Наш чай поистине считается уникальным.</p>
              
              <div className="row g-4">
                {[
                  {
                    img: "/home_column_1.png",
                    text: "Уникальность продукта обусловленная местом его прорастания и изготовления - волжская излучина с Жигулевскими горами."
                  },
                  {
                    img: "/home_column_2.png",
                    text: "Продукции присвоен знак Самарский продукт и Одобрено Хозяйкой Жигулей."
                  },
                  {
                    img: "/home_column_3.png",
                    text: "Ограниченное количество продукта и его вкусовая неповторимость при проверенном качестве."
                  },
                  {
                    img: "/home_column_4.png",
                    text: "Наш девиз — чай для каждого, но не для всех. Мы стараемся индивидуально работать с каждым покупателем и подбирать для него его индивидуальный чайный состав."
                  }
                ].map((item, index) => (
                  <div key={index} className="col-md-3">
                    <div className="p-4 h-100">
                      <img src={item.img} alt="" className="img-fluid mb-4" style={{height: '80px'}} />
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          {/* Блок контактов */}
          <div className="bg-dark text-white py-5">
            <div className="container text-center">
              <h2 className="display-5 mb-5">Подари себе и своим близким частичку Жигулевских гор.</h2>
              
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 className="mb-3">+7 987 654 32 10</h3>
                    <h3 className="mb-5">zhigulevskluk@yandex.ru</h3>
                    <p className="h5">Подписывайтесь на наши социальные сети:</p>
                  </div>
                  
                  <div className="d-flex justify-content-center gap-4">
                    {[
                      { icon: "/icons/facebook_logo_icon.png", alt: "Facebook" },
                      { icon: "/icons/vk_logo_icon.png", alt: "VK" },
                      { icon: "/icons/instagram_logo_icon.png", alt: "Instagram" },
                      { icon: "/icons/telegram_logo_icon.png", alt: "Telegram" }
                    ].map((social, index) => (
                      <Link key={index} to="#" className="text-decoration-none">
                        <img src={social.icon} alt={social.alt} style={{width: '40px'}} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default HomePage;
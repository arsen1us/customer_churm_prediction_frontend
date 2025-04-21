import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthProvider"

import CategoryManager from "../ManagerComponents/CategoryManagerComponent/CategoryManager";
import CategoryList from "../ListComponents/CategoryList";
import Select from "react-select/base";

import ProductManager from "../ManagerComponents/ProductManagerComponent/ProductManager";
import Promotion from "../PromotionComponent/Promotion";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

import "./HomePage.css"
// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const HomePage = () => {
    return (
        <div>
          {/* Блок c фоновым изображением */}
          <div className="hero-container">
            {/* Фоновое изображение */}
            <div className="hero-image"></div>

            {/* Контент поверх изображения */}
            <div className="hero-content">
              <h1>ЧАЙ ЖИГУЛЕВСКИХ ГОР</h1>
              <div className="subtitle">
                <p>Жигулевское</p>
                <p>лукоморье</p>
              </div>
              <button className="about-button">О нас</button>
            </div>
          </div>

          {/* Блок "О нас" (2 колонки)*/}
          <div className="about-container">
            <div className="about-column image-column">
              <img src="/selo_shiryaevo.jpg" alt="Чайная мастерская" className="about-image" />
            </div>

            <div className="about-column text-column">
              <div className="about-content">
                <h1>О нас</h1>

                <div className="about-text">
                  <p>Наша творческая чайная мастерская объединяет группу единомышленников увлеченных общей идеей — созданием лучших травяных чаев (напитков) для настоящих ценителей и поклонников русского чаепития. Созданием травяных чаев мы занимаемся около семи лет. Значительная часть времени ушла на получение настоящего хорошего чайного продукта, который имеет стабильные качественно-вкусовые показатели которые отвечали нашим требованиям. Для нас это не просто травяной чай, это живой организм с которым можно общаться, через который можно передавать и получать энергию. Вдохнув аромат чая мы получаем невероятный заряд бодрости. Это наш образ жизни.</p>
                </div>

                <div className="divider"></div>

                <button className="more-button">Подробнее</button>
              </div>
            </div>
          </div>

        {/* Блок с 4 колонками */}
        <div>
          <div>
            <h>Почему вы должны попробовать наш чай?</h>
          </div>
          <div>
            <p>Наш чай поистине считается уникальным.</p>
          </div>
          <div className="flex-container">
            <div className="column">
              <img src="/home_column_1.png"/>
              <p>Уникальность продукта обусловленная местом его прорастания и изготовления - волжская излучина с Жигулевскими горами.</p>
            </div>
            <div className="column">
              <img src="/home_column_2.png"/>
              <p>Продукции присвоен знак Самарский продукт и Одобрено Хозяйкой Жигулей.</p>
            </div>
            <div className="column">
              <img src="/home_column_3.png"/>
              <p>Ограниченное количество продукта и его вкусовая неповторимость при проверенном качестве.</p>
            </div>
            <div className="column">
              <img src="/home_column_4.png"/>
              <p>Наш девиз — чай для каждого, но не для всех. Мы стараемся индивидуально работать с каждым покупателем и подбирать для него его индивидуальный чайный состав.</p>
            </div>
          </div>
        </div>

        <div className="contacts-wrapper">
          <div>
            <h2>Подари себе и своим близким частичку Жигулевских гор.</h2>
          </div>

          {/* Блок с контактами */}
          <div>
            <div>
              <h3>+7 987 654 32 10</h3>
            </div>
            <div>
              <h3>zhigulevskluk@yandex.ru</h3>
            </div>
            <div>
              <p>Подписывайтесь на наши социальные сети:</p>
            </div>

            {/* Ссылки на соцсети */}
            <div className="social-links">
              <div>
                <Link to="#">
                  <img src="/icons/facebook_logo_icon.png" width="100px" alt="Facebook" />
                </Link>
              </div>
              <div>
                <Link to="#">
                  <img src="/icons/vk_logo_icon.png" width="100px" alt="VK" />
                </Link>
              </div>
              <div>
                <Link to="#">
                  <img src="/icons/instagram_logo_icon.png" width="100px" alt="Instagram" />
                </Link>
              </div>
              <div>
                <Link to="#">
                  <img src="/icons/telegram_logo_icon.png" width="100px" alt="Telegram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HomePage;
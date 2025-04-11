import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthProvider"

import CategoryManager from "../ManagerComponents/CategoryManagerComponent/CategoryManager";
import CategoryList from "../ListComponents/CategoryList";
import Select from "react-select/base";

import ProductManager from "../ManagerComponents/ProductManagerComponent/ProductManager";
import ProductList from "../ListComponents/ProductList";
import Promotion from "../PromotionComponent/Promotion";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const HomePage = () => {
    return (
        <div>
            <div>
              <div>
                <img src="/home_page_background.jpg"/>
              </div>
              <div>
                <p>Чай Жигулевских гор</p>
              </div>
              <div>
                <h>Жигулевское лукоморье</h>
              </div>
              <div>
                <button>О нас</button>
              </div>

              {/* Блок "О нас"*/}
              <div>
                <div>
                  <h>О нас</h>
                </div>
                <div>
                  <p>Наша творческая чайная мастерская объединяет группу единомышленников увлеченных общей идеей — созданием лучших травяных чаев (напитков) для настоящих ценителей и поклонников русского чаепития. Созданием травяных чаев мы занимаемся около семи лет. Значительная часть времени ушла на получение настоящего хорошего чайного продукта, который имеет стабильные качественно-вкусовые показатели которые отвечали нашим требованиям. Для нас это не просто травяной чай, это живой организм с которым можно общаться, через который можно передавать и получать энергию. Вдохнув аромат чая мы получаем невероятный заряд бодрости. Это наш образ жизни.</p>
                </div>
                <div>
                  <buton>Подробнее</buton>
                </div>
              </div>

              {/* Блок "О нас"*/}
              <div>
                <div>
                  <h>Почему вы должны попробовать наш чай?</h>
                </div>
                <div>
                  <p>Наш чай поистине считается уникальным.</p>
                </div>
                
                {/* Блок с 4 колонками */}
                <div>
                  <div>
                    <img src="/home_column_1.png"/>
                    <p>Уникальность продукта обусловленная местом его прорастания и изготовления - волжская излучина с Жигулевскими горами.</p>
                  </div>
                  <div>
                    <img src="/home_column_2.png"/>
                    <p>Продукции присвоен знак Самарский продукт и Одобрено Хозяйкой Жигулей.</p>
                  </div>
                  <div>
                    <img src="/home_column_3.png"/>
                    <p>Ограниченное количество продукта и его вкусовая неповторимость при проверенном качестве.</p>
                  </div>
                  <div>
                    <img src="/home_column_4.png"/>
                    <p>Наш девиз — чай для каждого, но не для всех. Мы стараемся индивидуально работать с каждым покупателем и подбирать для него его индивидуальный чайный состав.</p>
                  </div>
                </div>
              </div>

              {/* Блок Подари себе и своим близким частичку Жигулевских гор. */}
              <div>
                <h>Подари себе и своим близким частичку Жигулевских гор.</h>
              </div>

              {/* Блок с контактами */}
              <div>
                <div>
                  <h>+7 927 217 33 19</h>
                </div>
                <div>
                  <h>zhigulevskluk@yandex.ru</h>
                </div>
                <div>
                  <p>Подписывайтесь на наши социальные сети:</p>
                </div>
                {/* Ссылки на соцсети */}
                  <div>
                    <div>
                      <Link>
                        <img/>
                        facebook
                      </Link>
                    </div>
                    <div>
                      <Link>
                        <img/>
                        vk
                      </Link>
                    </div>
                    <div>
                      <Link>
                        <img/>
                        instagram(запрещено)
                      </Link>
                    </div>
                  </div>
              </div>
              <div>
                <ProductList/>
              </div>
            </div>
        </div>
    );
};

export default HomePage;
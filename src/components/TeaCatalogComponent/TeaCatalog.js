import React, { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../AuthProvider"
import Category from "../CategoryComponent/Category";
import TeaList from "../TeaListComponent/TeaList";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./TeaCatalog.css"

const tea = [
    "Отборные листья кипрея узколистного, дикорос, крупнолистовой, сорт высший.",
    "Отборные листья кипрея узколистного, дикорос, мелколистовой, сорт высший.",
    "Пакетированный (фильтр пакет), отборные листья кипрея узколистного, дикорос, мелколистовой или гранулированный, сорт высший.",
    "Отборные листья кипрея узколистного, смесь гранулированного и мелколистового, дикорос, сорт высший.",
    "Отборные листья кипрея узколистного, дикорос, гранулированный, сорт высший.",
    "Отборные листья кипрея узколистного с цветком и бутоном, дикорос, крупнолистовой, сорт высший.",
    "Отборные листья кипрея узколистного с цветком и ягодой вишни дикорос, крупнолистовой, сорт высший.",
]

const TeaCatalog = () => {
    return (
        <div>
            <div>
                <h1>Каталог</h1>
            </div>
            <div>
                <p>Все чайные травы собраны в излучине реки Волга в Жигулевских горах и обработаны ручным способом по традиционной местной технологии.</p>
            </div>
            <div>
                <p>Сувенирной продукции делается своими руками с учетом Ваших предпочтений и пожеланий.</p>
            </div>
            <div>
                <TeaList/>
            </div>

            <div>
                <div>
                    <h1>Предлагаемый чай</h1>
                </div>
                <div className="product-grid">
                    {tea.map((text, index) => (
                        <div key={index} className="tea-card">
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Форма для создания персонального заказа */}
            <div>
                <div>
                    <h1>Хотите заказать чай?</h1>
                </div>
                <div>
                    <p>Себе или в подарок? Либо у вас есть предложения по взаимовыгодному сотрудничеству? Заполните заявку и мы с вами свяжемся в ближайшее время.</p>
                </div>
                <div>
                    <form method="post">
                        <div>
                            <label>Ваш e-mail</label>
                            <input type="email"/>
                        </div>
                        <div>
                            <label>Ваш телефон</label>
                            <input type="tel"/>
                        </div>
                        <div>
                            <label>Ваше имя</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <button type="submit">Отправить</button>
                        </div>
                        <div>
                            <p>Нажимая кнопку "Отправить" вы соглашаетесь с <a src="#">политикой обработки персональных данных</a>.</p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Категории чая */}
            <div>
                <Category/>
            </div>


        </div>
    );
}

export default TeaCatalog;
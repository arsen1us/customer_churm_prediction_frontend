import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const ControlPanelComponent = () => {
    return (
        <div>
            <div>
                <h3>Панель управления</h3>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/handle-category">Управление категориями</Link>  
                    </li>
                    <li>
                        <Link to="/handle-coupon">Управление купонами</Link>
                    </li>
                    <li>
                        <Link to="/handle-product">Управление продуктами</Link> 
                    </li>
                    <li>
                        <Link to="/handle-promotion">Управление рекламой</Link>
                    </li>
                    <li>
                        <Link to="/handle-review">Управление отзывами</Link>
                    </li>
                    <li>
                        <Link to="/handle-user">Управление пользователями</Link>
                    </li>
                    <li>
                        <Link to="/handle-company">Управление компаниями</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ControlPanelComponent;
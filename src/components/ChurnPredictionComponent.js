import React, { useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

import "../RetentionAction.css"
const ChurnPrediction = () => {

// Логика таблицы ==========================================================================

    // Список пользователей
  const [users, setUsers] = useState([
    { id: 1, name: "Иванов Иван", lastActivity: "3 дня назад", action: "Просмотр страницы", churnRate: "90%", selected: false },
    { id: 2, name: "Дмитриев Дмитрий", lastActivity: "3 дня назад", action: "Добавление в корзину", churnRate: "85%", selected: false },
    { id: 3, name: "Александров Александр", lastActivity: "5 часов назад", action: "Просмотр страницы", churnRate: "55%", selected: false },
  ]);

  // Выбор всех пользователей
  const [selectAll, setSelectAll] = useState(false);

  // Обработчик для выбора всех пользователей
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setUsers(users.map(user => ({ ...user, selected: newSelectAll })));
  };

  // Обработчик для выбора отдельного пользователя
  const handleUserSelect = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, selected: !user.selected } : user));
  };

  // Кнопка для действий по удержанию
  const handleRetentionActions = () => {
    const selectedUsers = users.filter(user => user.selected);
    alert(`Действия применяются к пользователям: ${selectedUsers.map(u => u.name).join(", ")}`);
  };

// Логика таблицы ==========================================================================


// Popup ===================================================================================
const [selectAllPopup, setSelectAllPopup] = useState(false);
  const [selectedActions, setSelectedActions] = useState({
    personalDiscount: false,
    recommendProducts: false,
    itemsInCart: false,
    viewedProducts: false,
  });

  // Обработчик выбора всех чекбоксов
  const handleSelectAllPopup = () => {
    const newValue = !selectAllPopup;
    setSelectAllPopup(newValue);
    setSelectedActions({
      personalDiscount: newValue,
      recommendProducts: newValue,
      itemsInCart: newValue,
      viewedProducts: newValue,
    });
  };

// Обработчик отдельного чекбокса
const handleCheckboxChange = (action) => {
    setSelectedActions({ ...selectedActions, [action]: !selectedActions[action] });
  };

  // Обработчик выполнения действий
  const handleSubmit = () => {
    const actions = Object.keys(selectedActions).filter(
      (key) => selectedActions[key]
    );
    console.log("Выполнить действия:", actions);
    alert(`Действия: ${actions.join(", ")} выполнены!`);
  };

    // Управление popup ===================================

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const [reviewText, setReviewText] = useState("");
    const [reviewGrade, setReviewGrade] = useState(1);
    const [reviewModelList, setReviewModelList] = useState([]);

    // Управление popup ===================================

// Popup ===================================================================================


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Список пользователей</h2>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              {" "}Выбрать всё
            </th>
            <th>ФИО</th>
            <th>Последняя активность пользователя</th>
            <th>Последняя активность</th>
            <th>Вероятность ухода</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={user.selected}
                  onChange={() => handleUserSelect(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.lastActivity}</td>
              <td>{user.action}</td>
              <td>{user.churnRate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={openPopup}
        style={{
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Выбрать действий по удержанию
      </button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
          <div className="retention-container">
          <h2 className="title">Действия по удержанию клиента</h2>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={selectAllPopup}
                onChange={handleSelectAllPopup}
              />
              Выбрать всё
            </label>
          </div>
          <div className="action-items">
            <label>
              <input
                type="checkbox"
                checked={selectedActions.personalDiscount}
                onChange={() => handleCheckboxChange("personalDiscount")}
              />
              Отправить пользователю уведомление с персональной скидкой
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedActions.recommendProducts}
                onChange={() => handleCheckboxChange("recommendProducts")}
              />
              Отправить пользователя уведомлению о продуктах, которые ему могут понравиться
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedActions.itemsInCart}
                onChange={() => handleCheckboxChange("itemsInCart")}
              />
              Отправить пользоватлю уведомление с продуктами, которые он ранее добавлял в корзину
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedActions.viewedProducts}
                onChange={() => handleCheckboxChange("viewedProducts")}
              />
              Отправить уведомление о товарах, которые пользователь ранее смотрел
            </label>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Выполнить
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default ChurnPrediction;
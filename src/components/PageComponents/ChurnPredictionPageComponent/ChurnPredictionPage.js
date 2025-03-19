import React, { useState, useEffect, useRef, useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../../PopupComponent/Popup";
import { AuthContext } from "../../../AuthProvider";

import "./RetentionAction.css"
const ChurnPredictionPage = () => {

  const {token,handleRequestError} = useContext(AuthContext);
  const [churnPredictionList, setChurnPredictionList] = useState([]);
  const [mlModelInput, setmlModelInput] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  const [users, setUsers] = useState([
    { id: 1, name: "Иванов Иван", lastActivity: "3 дня назад", action: "Просмотр страницы", churnRate: "90%", selected: false },
    { id: 2, name: "Дмитриев Дмитрий", lastActivity: "3 дня назад", action: "Добавление в корзину", churnRate: "85%", selected: false },
    { id: 3, name: "Александров Александр", lastActivity: "5 часов назад", action: "Просмотр страницы", churnRate: "55%", selected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  /**
  * Загрузить список предсказаний оттока пользователей
  */
  const getCharnPredictionList = async () => {
    try{ 
        const response = await axios.get(`https://localhost:7299/api/churn-prediction`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response && response.status === 200){
            if(response.data && response.data.churnPredictionList){
              setChurnPredictionList(response.data.churnPredictionList);
              console.log(response.data.churnPredictionList);
            }
        }
    }
    catch (error){
        await handleRequestError(error);
    }
  }

    const getMLModelInputByUserId = async (userId) => {
      try{ 
        if(userId){
          const response = await axios.get(`https://localhost:7299/api/churn-prediction/ml-input/${userId}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
          })
          if(response && response.status === 200){
              if(response.data && response.data.mlModelInput){
                setmlModelInput(response.data.mlModelInput);
                console.log(response.data.mlModelInput);
              }
          }
        }
    }
    catch (error){
        await handleRequestError(error);
    }
    }

  /**
   * Обработчик для выбора всех пользователей
   */
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setUsers(users.map(user => ({ ...user, selected: newSelectAll })));
  };

  /**
   * Обработчик для выбора отдельного пользователя
   * @param {*} id 
   */
  const handleUserSelect = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, selected: !user.selected } : user));
  };

  /**
   * Кнопка для действий по удержанию
   */
  const handleRetentionActions = () => {
    const selectedUsers = users.filter(user => user.selected);
    alert(`Действия применяются к пользователям: ${selectedUsers.map(u => u.name).join(", ")}`);
  };

const [selectAllPopup, setSelectAllPopup] = useState(false);
  const [selectedActions, setSelectedActions] = useState({
    personalDiscount: false,
    recommendProducts: false,
    itemsInCart: false,
    viewedProducts: false,
  });

  /**
   * Обработчик выбора всех чекбоксов
   * 
   */
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

/**
 * Обработчик отдельного чекбокса
 * @param {*} action 
 */
const handleCheckboxChange = (action) => {
    setSelectedActions({ ...selectedActions, [action]: !selectedActions[action] });
  };

  /**
   * Обработчик выполнения действий
   */
  const handleSubmit = () => {
    const actions = Object.keys(selectedActions).filter(
      (key) => selectedActions[key]
    );
    console.log("Выполнить действия:", actions);
    alert(`Действия: ${actions.join(", ")} выполнены!`);
  };

  

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const [reviewText, setReviewText] = useState("");
    const [reviewGrade, setReviewGrade] = useState(1);
    const [reviewModelList, setReviewModelList] = useState([]);

  useEffect(() => {
    getCharnPredictionList()
  }, []);


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div>
        {churnPredictionList? (
          <>
            <ul>
              {churnPredictionList.map((churnPrediction, index) => (
                <li key={index}>
                  <div>
                    <div>
                      <p>User: {churnPrediction.user.firstName} {churnPrediction.user.lastName}</p>
                    </div>
                    <div>
                      <p>Churn prediction: Score: {churnPrediction.churnPrediction.score}, Probability: {churnPrediction.churnPrediction.probability}</p>
                    </div>
                    <div>
                    {mlModelInput?.userId === churnPrediction.user.id ? (
                      <div>
                          {/* Тут рендерится контент, если условие выполняется */}
                          <p>Детали пользователя: {mlModelInput.userId}</p>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => getMLModelInputByUserId(churnPrediction.user.id)}>Получить подробную информацию</button>
                      </>)}
                    </div>
                    <div>
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
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>Загрузка списка предсказаний</p>
          </>)}
      </div>

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
    </div>
  );
};

export default ChurnPredictionPage;
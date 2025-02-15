import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {AuthContext} from "../../AuthProvider"

const NotificationList = () => {

  // Метод для обновления токена
  const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);

    const [notificationList, setNotificationList] = useState([
        { id: 1, message: "1 Product(ов) успешно создан(ы)!" },
        {
            id: 2,
            message: "Ранее вы интересовались данными продуктами:",
            recommendations: [
              { id: 201, name: "Сыр", image: "72baf0f2-f174-4302-bcb3-f5c8d205f576.jpg" },
              { id: 202, name: "Молоко", image: "410ff4c6-1eea-4077-96c7-875d970cd7b6.jpg" },
              { id: 203, name: "Творог", image: "3ad3c8c3-79eb-401a-a2e6-93a18e3e7fe5.jpg" },
            ],
          },
        { id: 3, message: "1 Product(ов) успешно создан(ы)!" },
        { id: 4, message: "1 Product(ов) успешно создан(ы)!" },
        {
          id: 5,
          message: "Ранее вы интересовались данными продуктами: ",
          recommendations: [
            { id: 101, name: "Ананасы", image: "d2b21787-6cba-4de4-9d55-297e186924a5.jpg" },
            { id: 102, name: "Яблоки", image: "31dee343-c897-40a6-a99a-46e0f2cbddae.jpg" },
            { id: 103, name: "Бананы", image: "a7761d94-82b4-44a5-8510-177b1d903c4d.jpeg" },
          ],
        },
      ]);

    /// <summary>
    /// Получить список уведомлений по id пользователя
    /// </summary>
    const GetNotificationListByUserIdAsync = async () => {
        try{
          const response = await axios.get(`https://localhost:7299/api/notification/${user.id}`, {
              headers: {
                  "Authorization": "Bearer" + token
              }
          });
                    
          if(response && response.status === 200){
              if(response.data && response.data.notificationList){
                  setNotificationList(response.data.notificationList);
              }
          }  
        }
        catch (error){
          await handleRequestError(error);
        }
    }

    const AddNotification = async () => {

    }


    useEffect(() => {
        // GetNotificationListByUserIdAsync();
    }, []);

    return(
        <div>
      {notificationList.length > 0 ? (
        <ul>
            <p>Непрочитанные:</p>
          {notificationList.map((notification, index) => (
            <li 
                key={index} 
                style={{
                    border: "1px solid #ddd", // Серая обводка
                    borderRadius: "8px", // Скругленные углы
                    padding: "16px", // Отступы внутри
                    marginBottom: "12px", // Расстояние между уведомлениями
                    backgroundColor: "#f9f9f9", // Светло-серый фон
                    position: "relative"
                  }}
                  >
                    <button
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "transparent", // Прозрачный фон
                          border: "none", // Убираем рамку
                          fontSize: "14px",
                          cursor: "pointer",
                          color: "#999", // Серый цвет
                        }}
                        title="Скрыть"> Скрыть </button>

              <p>{notification.message}</p>
              {notification.recommendations && (
                <div style={{ display: "flex", gap: "10px" }}>
                  {notification.recommendations.map((rec) => (
                    <a
                    key={rec.id}
                    href={`/product/${rec.id}`}
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      flex: "1",
                    }}
                  >
                    <img
                      src={`https://localhost:7299/uploads/${rec.image}`}
                      alt={rec.name}
                      style={{
                        width: "80px", // Увеличенный размер изображения
                        height: "80px",
                        borderRadius: "50%", // Круглая форма
                        objectFit: "cover", // Обрезка, чтобы изображение заполняло круг
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        color: "#333",
                      }}
                    >
                      {rec.name}
                    </p>
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>На данный момент уведомлений нет</p>
      )}
    </div>
    )
}

export default NotificationList;
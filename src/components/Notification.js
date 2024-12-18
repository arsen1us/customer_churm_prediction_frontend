import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const NotificationSystem = () => {

    const [connection, setConnection] = useState(null);
    const [notificationList, setNotificationList] = useState([]);

    /// <summary>
    /// Установить соединение с хабом SignalR 
    /// </summary>
    useEffect(() => {

        const token = localStorage.getItem("token");
                    if(token){
                        const decodedToken = jwtDecode(token);
                        if(decodedToken){
                            if(decodedToken.Id){
                                const newConnection = new HubConnectionBuilder()
                                .withUrl("https://localhost:7299/notification-hub", {
                                    accessTokenFactory: () => token
                                })
                                .withAutomaticReconnect() // автоматическое переподключение
                                .configureLogging(LogLevel.Information) // логирование
                                .build();
                            
                                setConnection(newConnection);
                            }
                        }
                    }
    }, []);

    /// <summary>
    /// Ессли произошло успешное подключение к хабу SignalR
    /// </summary>
    useEffect(() => {
        if(connection){
            connection.start()
            .then(() => {
                console.log("Successfuly connected to SignalR Hub");

                // Подписка на колбэки с хаба сигналр
                connection.on("ReceiveNotification", (message) => {
                    console.log("Сообщение получено: " + message)
                    setNotificationList((prev) => [...prev, message]);
                });
            })
            .catch((error) => console.log("Connection failed", error));

            return () => {
                if(connection){
                    connection.stop();
                }
            };
        }
    }, [connection]);

    return (
        <div>
            <h4>Список уведомлений</h4>
            <ul>
                {notificationList.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationSystem;

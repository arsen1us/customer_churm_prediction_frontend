import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useState, useEffect } from "react";

const NotificationSystem = () => {

    const [connection, setConnection] = useState(null);
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7299/notification-hub")
            .withAutomaticReconnect() // автоматическое переподключение
            .configureLogging(LogLevel.Information) // логирование
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if(connection){
            connection.start()
            .then(() => {
                console.log("Successfuly connected to SignalR Hub");

                // Подписка на колбэки с хаба сигналр
                connection.on("ReceiveNotification", (message) => {
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
            <h4>Notification list</h4>
            <ul>
                {notificationList.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationSystem;

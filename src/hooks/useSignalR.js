import React, {createContext, useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AuthContext } from "../AuthProvider"

const useSignalR = () => {
    const {token, user, handleRequestError} = useContext(AuthContext)
    const [connection, setConnection] = useState(null);
    const [notificationList, setNotificationList] = useState([]);

    /**
     * Установить соединение с хабом SignalR 
     */
    const connectToSignalR = async () => {
        if(token){
            try{
                const newConnection = new HubConnectionBuilder()
                    .withUrl("https://localhost:7299/notification-hub", {
                        accessTokenFactory: () => token
                    })
                    .withAutomaticReconnect()
                    .configureLogging(LogLevel.Information)
                    .build();

                    newConnection.on("OnConnected", (message) => {
                        console.log("Получено уведомление:", message)
                    });
                
                setConnection(newConnection);
                alert("Успешно подключено к SignalR");
            }
            catch(error){
                alert(`Произошла ошибка при подключении к SignalR. Детали ошибки:` + error);
            }
        }
    }

    useEffect(() => {
        connectToSignalR();
    }, [token]);
    
    /**
     * Подписка на получение уведомлений
     */
    useEffect(() => {
        if (!connection) return;

        connection
            .start()
            .then(() => {
                console.log("SignalR Connected");

                connection.on("OnConnected", (message) => {
                    console.log("Получено уведомление:", message)
                });
                connection.on("SendDatabaseNotification", (message) => {
                    console.log("Получено уведомление:", message);
                });

                connection.on("ReceivePersonalNotification", (message) => {
                    setNotificationList((prev) => [...prev, message]);
                    console.log("Личное уведомление:", message);
                });
            })
            .catch((error) => console.error("Ошибка подключения к SignalR:", error));

        return () => {
            connection.stop();
        };
    }, [connection]);
}

export default useSignalR;
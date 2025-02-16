import React, {createContext, useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AuthContext } from "../AuthProvider"

const useSignalR = () => {
    const {token, user, handleRequestError} = useContext(AuthContext)
    const [connection, setConnection] = useState(null);

    /**
     * Установить соединение с хабом SignalR 
     */
    const connectToSignalR = async () => {
        try{
            const newConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7299/notification-hub", {
                    accessTokenFactory: token
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            
            setConnection(newConnection);
            alert("Успешно подключено к SignalR");
        }
        catch(error){
            alert(`Произошла ошибка при подключении к SignalR. Детали ошибки:` + error);
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

                connection.on("ReceiveNotification", (message) => {
                    setNotifications((prev) => [...prev, message]);
                    console.log("Получено уведомление:", message);
                });

                connection.on("ReceivePersonalNotification", (message) => {
                    setNotifications((prev) => [...prev, message]);
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
import React, {createContext, useEffect, useState, useRef, useContext} from "react";
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
                .withAutomaticReconnect() // автоматическое переподключение
                .configureLogging(LogLevel.Information) // логирование
                .build();
            
            setConnection(newConnection);
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
        try{
            if(connection){
                connection.start()
                .then(() => {
    
                    connection.on("ReceiveNotification", () => {
                        
                    });
    
                    connection.on("ReceivePersonalNotification", () => {
                        
                    });
                })
                .catch((error) => alert("Connection failed", error));
    
                return () => {
                    if(connection){
                        connection.stop();
                    }
                };
            }
        }
        catch(error){
            alert("Не удалось подписаться на получение уведомлений. Детали: " + error)
        }
    }, [connection]);
}

export default useSignalR;
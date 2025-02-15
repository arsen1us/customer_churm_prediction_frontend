import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const SessionManager = () => {
    const {user, token, handleRequestError} = useContext(AuthContext);
    const timeoutId = useRef(null);
    const sessionUpdateInterval = useRef(null);
    
    /**
     * Создание сессии
     * @returns 
     */
    const createSession = async () => {
        if (!user) return;
        
        try {
            const response = await axios.post("https://localhost:7299/api/session", {
                userId: user.id
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 200) {
                alert("Сессия успешно создана");
                localStorage.setItem("sessionActive", JSON.stringify(true));
                startUpdatingSession();
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    /**
     * Обновление сессии
     * @returns 
     */
    const updateSession = async () => {
        if (!user) return;

        try {
            const response = await axios.put(`https://localhost:7299/api/session/${user.id}`, {
                userId: user.id
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 200) {
                alert("Сессия обновлена");
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    /**
     * Завершение сессии
     * @returns 
     */
    const closeSession = async () => {
        if (!user) return;

        try {
            await axios.delete(`https://localhost:7299/api/session/${user.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            alert("Сессия завершена");
            localStorage.removeItem("sessionActive");

        } catch (error) {
            handleRequestError(error);
        }
    };

    /**
     * Запуск периодического обновления сессии
     * @returns 
     */
    const startUpdatingSession = () => {
        if (!JSON.parse(localStorage.getItem("sessionActive"))) {
            return;
        }

        if (!sessionUpdateInterval.current) {
            sessionUpdateInterval.current = setInterval(updateSession, 60000);
        }
    };

    /**
     * Остановка обновления сессии
     * @returns 
     */
    const stopUpdatingSession = () => {
        if (sessionUpdateInterval.current) {
            clearInterval(sessionUpdateInterval.current);
            sessionUpdateInterval.current = null;
        }
    };

    /**
     * Обработка активности пользователя (движение мыши / клики)
     * @returns 
     */
    useEffect(() => {
        const resetInactivityTimer = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                console.log("Пользователь неактивен 3 секунды");
                updateSession();
            }, 3000);
        };

        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("click", resetInactivityTimer);

        return () => {
            window.removeEventListener("mousemove", resetInactivityTimer);
            window.removeEventListener("click", resetInactivityTimer);

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    /**
     * Обработчик закрытия вкладки
     * @returns 
     */
    useEffect(() => {
        window.addEventListener("beforeunload", closeSession);

        return () => {
            window.removeEventListener("beforeunload", closeSession);
            stopUpdatingSession();
        };
    }, []);

    /**
     * Создание сессии при монтировании
     * @returns 
     */
    useEffect(() => {
        if (user) {
            createSession();
        }
        return () => {
            stopUpdatingSession();
        };
    }, [user]);

    return null;
};

export default SessionManager;
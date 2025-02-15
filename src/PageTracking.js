import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const usePageTracking = () => {

    const location = useLocation();
    const { user } = useContext(AuthContext);

    ///<summary>
    /// Отправить информацию о посещении пользователя страницы
    ///</summary>
    const sendPage = async () => {
        try {
            const response = await axios.post("https://localhost:7299/api/page", {
                userId: user.id,
                pageUrl: location.pathname,
            });
        } 
        catch (error) {
            console.error("Ошибка отправки данных о посещении страницы", error);
        }
    }

    useEffect(() => {
        if (user) {
            sendPage();
        }
    }, [location.pathname, user]);
};

export default usePageTracking;
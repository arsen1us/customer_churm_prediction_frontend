import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const usePageTracking = () => {

    const location = useLocation();
    const { user, token, handleRequestError } = useContext(AuthContext);

    ///<summary>
    /// Отправить информацию о посещении пользователя страницы
    ///</summary>
    /**Отправляет информацию о странице, на которую перешёл пользователь */
    const sendPage = async () => {
        try {
            const response = await axios.post("https://localhost:7299/api/page", {
                userId: user.id,
                pageUrl: location.pathname,
            }, {
                headers: {
                    "Authorization": "Bearer "+ token
            }});
        } 
        catch (error) {
            await handleRequestError(error);
        }
    }

    useEffect(() => {
        if (user) {
            sendPage();
        }
    }, [location.pathname, user]);
};

export default usePageTracking;
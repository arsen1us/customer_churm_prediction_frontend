import React, {useState, useContext, useEffect} from "react";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";
import { useNavigate } from "react-router-dom";
import { useLogging } from "../../hooks/useLogging";

const AuthenticateForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(1);

    const {handleRequestError, user, login} = useContext(AuthContext);
    const {trackUserAction} = useTracking();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const {logInfo, logWarning, logError} = useLogging();
    
    /**
     * Аутентификация пользователя 
     * @param {*} e 
     */
    const authAsync = async (e) => {
        if(email === "" || password === ""){
            alert("Заполните поле login и password");
            logWarning(`Попытка аутентификации. Не все поля были заполнены`);
        }
        try{
            e.preventDefault();
            await login(email, password);
            setIsAuthenticated(true);
            navigate("/");
            logInfo(`Пользователь с email [${email}] успешно вошёл в систему `);
        }
        catch(error){
            logError(`Произошла ошибка во время аутентификации пользователя`);
            handleRequestError(error);
        }
    }

    /**
     * Добавить действие аутентификация пользователя
     */
    useEffect(() => {
        if(isAuthenticated && user?.id){
            trackUserAction("Authenticate", {
                isSuccess: String(true),
                attempts: String(attempts)
            });
        }
    }, [user, isAuthenticated])

    return(
        <div>
            <div>
                Форма аутентификации
            </div>
            <form method="post" onSubmit={authAsync}>
                <label>Email</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <label>Password</label>
                <input 
                    type="password"
                    value={password}    
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Authenticate</button>
            </form>
        </div>
    );
};

export default AuthenticateForm;
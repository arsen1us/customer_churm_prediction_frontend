import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"

const AuthenticateForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Метод для обновления токена
    const {login} = useContext(AuthContext);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return(
        <div>
            <div>
                Форма аутентификации
            </div>
            <form method="post" onSubmit={HandleSubmit}>
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
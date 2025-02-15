import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";

const AuthenticateForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(1);

    const {user, login} = useContext(AuthContext);
    const {trackUserAction} = useTracking();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);

        await trackUserAction("Authenticate", {
            isSuccess: String(true),
            attempts: String(attempts)
        });   
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
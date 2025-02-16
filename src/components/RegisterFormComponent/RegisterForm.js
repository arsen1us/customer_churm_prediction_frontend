import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../AuthProvider"
import useTracking from '../../hooks/useTracking';

const RegisterForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitPassword, setSubmitPassword] = useState("");
    const [attempts, setAttempts] = useState(1);

    const {user, register} = useContext(AuthContext);
    const {trackUserAction} = useTracking(); 
    const [isRegister, setIsRegister] = useState(false);

    /**
     * Регистрация пользователя
     * @param {*} e 
     */
    const HandleSubmit = async (e) => {
        e.preventDefault();
        await register(firstName, lastName, email, password);
        setIsRegister(true);
    }

    /**
     * Добавить действие регистрации пользователя
     */
    useEffect(() => {
        if(isRegister && user?.id){
            trackUserAction("Register", {
                isSuccess: String(true),
                attempts: String(attempts)
            });
        }
    }, [user, isRegister]);

    return(
        <div>
            <div>
                Форма регистрации
            </div>
            <form method="post" onSubmit={HandleSubmit}>
                
                <div>
                    <label>FirstName</label>
                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                    />
                </div>
                
                <div>
                    <label>LastName</label>
                    <input 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Second name"
                    />    
                </div>
                
                <div>
                    <label>Email</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                    
                <div>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}    
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                    
                <div>
                    <label>Submit password</label>
                    <input 
                        type="password"
                        value={submitPassword}
                        onChange={(e) => setSubmitPassword(e.target.value)}
                        placeholder="Submit password"
                    />                    
                </div>

                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
import React, { useState, useEffect } from 'react';
import axios from "axios";

const RegisterForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitPassword, setSubmitPassword] = useState("");

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try{
            var response = await axios.post("https://localhost:7299/api/user/reg", 
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                 });
            if(response.status === 200)
            {
                const authToken = response.data.token;

                const token = authToken.replace("Bearer", "")
                localStorage.setItem("token", token)
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 400:
                        alert("Ошибка 400. Скорее всего не верно переданы данные в теле запроса!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    return(
        <div>
            <div>
                Форма регистрации
            </div>
            <form method="post" onSubmit={HandleSubmit}>
                <div>

                </div>
                <label>FirstName</label>
                <input 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                />
                <div>
                    
                </div>
                <label>LastName</label>
                <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Second name"
                />
                <div>
                    
                </div>
                <label>Email</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
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
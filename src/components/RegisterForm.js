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
        catch (error)
        {
            alert(error);
        }
    }

    return(
        <div>
            <div>
                Форма регистрации
            </div>
            <form method="post" onSubmit={HandleSubmit}>
                <label>FirstName</label>
                <input 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                />
                <label>LastName</label>
                <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Second name"
                />
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
                <label>Submit password</label>
                <input 
                    type="password"
                    value={submitPassword}
                    onChange={(e) => setSubmitPassword(e.target.value)}
                    placeholder="Submit password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
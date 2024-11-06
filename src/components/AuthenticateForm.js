import React, {useState} from "react";
import axios from "axios";

const AuthenticateForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try{
            var response = await axios.post("https://localhost:7299/api/user/auth", 
                {
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
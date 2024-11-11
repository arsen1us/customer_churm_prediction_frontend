import React, {useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    // Заменил на decodedToken.Id, так как userId обновляется async и не успевает обновиться
    // const[userId, setUserId] = useState("");

    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken != null || authToken != undefined || authToken != "")
                {
                    const token = authToken.replace("Bearer", "");
                    localStorage.removeItem("token");
                    localStorage.setItem("token", token);
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    // Получить информацию о пользователе
    const GetUserInfo = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");

            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken.Id)
                {
                    const response = await axios.get(`https://localhost:7299/api/user/${decodedToken.Id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                    );

                    if(response.status === 200)
                    {
                        if(response.data.firstName && response.data.lastName && response.data.email)
                        {
                            setFirstName(response.data.firstName);
                            setLastName(response.data.lastName);
                            setEmail(response.data.email);
                        }
                    }
                }
            }
        }
        catch (error)
        {
            console.log(error)
            // Если у пользователя истёк срок jwt-токена
            if(error.response && error.response.status === 401)
            {
                // Обновить токен
                await UpdateToken();
                // Выполнить метод ещё раз, если токен успешно обновлён
                GetUserInfo();
            }
        }
    }

    return (
        <div>
            <button onClick={GetUserInfo}>Get user info</button>
            <div>
                <h2>User information</h2>
                <p>FirstName: {firstName}</p>
                <p>LastName: {lastName}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    );
}

export default Profile;


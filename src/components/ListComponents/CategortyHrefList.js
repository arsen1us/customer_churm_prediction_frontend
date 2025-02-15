// Список категорий, где каждая категория является ссылкой

import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"

const CategoryHrefList = () => {
    // Список категорий
    const [categoryList, setCategoryList] = useState([]);

    // Метод для обновления токена
    const {refreshToken, handleRequestError} = useContext(AuthContext);

    // Обновить токен
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken)
                {
                    const token = authToken.replace("Bearer");
                    localStorage.setItem(token);
                }
            }
        }
        catch(error){
            await handleRequestError(error);
        }
    }

    // Получить список категорий 
    const GetCategoryListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/category");

            if(response.status === 200)
            {
                const responseData = response.data.categoryList;
                if(response.data.categoryList)
                {
                    setCategoryList(responseData);
                }
            }
        }
        catch(error){
            await handleRequestError(error);
        }
    }

    useEffect(() => {
        GetCategoryListAsync();
      }, []);

    return (
        <div>
            <ul>
                {categoryList.map((category, index) => (
                    <li key={index}>    
                        <div>
                           <Link to={`/category/${category.id}`}>{category.name}</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryHrefList
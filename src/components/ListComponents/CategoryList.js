import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"

const CategoryList = () => {
    // Список категорий
    const [categoryList, setCategoryList] = useState([]);

    // Метод для обновления токена
    const {refreshToken, handleRequestError} = useContext(AuthContext);

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
                           <p>{category.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList
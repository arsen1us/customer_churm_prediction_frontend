import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

/**
 * Компонент для отображения категорий чая
 * @returns 
 */
const Category = () => {

    const {user, token, handleRequestError} = useContext(AuthContext);
    /**
     * Список всех категорий чая
     */
    const [categories, setCategories] = useState([]);

    /**
     * Загружает список всех категорий чая
     */
    const GetCategoriesAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/category", {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });
            console.log(response)
            if(response.status && response.status === 200) {
               if(response.data && response.data.categories) {
                setCategories(response.data.categories)
               }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Загружает список всех категорий чая при монтировании компонента
     */
    useEffect(() => {
        GetCategoriesAsync();
    }, [])

    return (
        <div>
            <h1>Категории</h1>
            <div>
                {categories.map((category, index) => (
                    <div>
                        Название категории: {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
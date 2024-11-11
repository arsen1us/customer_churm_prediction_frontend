import React, {useState} from "react";
import axios from "axios";

const HandleCategoryComponent = () => {
    // Название категории
    const [categoryName, setCategoryName] = useState("");
    // Список категорий
    const [categoryList, setCategoryList] = useState([]);

    // Обновить токен
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7777/api/token/update", {
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
        catch(error)
        {
            // Внутрянняя ошибка сервера (Internal server error)
            if(response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
        }
    }

    // Получить список категорий 
    const GetCategoryListAsync = async () => {
        try{
            const response = await axios.get("");

            if(response.status === 200)
            {
                const responseData = response.data.categoryList;
                if(responseData)
                {
                    setCategoryList(responseData);
                }
            }
        }
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
        }
    }

    // Добавить категорию
    const AddCategoryAsync = async () => {
        try{
            const response = await axios.post("", {
                name: categoryName
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
        )
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }

    // Изменить категорию
    const UpdateCategoryAsync = async () => {
        try{
            const response = await axios.put("", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }

    // Удалить категорию
    const DeleteCategoryAsync = async () => {
        try{
            const respons = await axios.delete("", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }

    useEffect(() => {
        GetCategoryListAsync();
      }, []);

    return (
        <div>
            <div>
                <button>Добавить</button>
            </div>
            <div>
                <ul>
                    {categoryList.map((category, index) => (
                        <li key={index}>
                            <p>{category.name}</p>
                            <div>
                                <div>
                                    <button onClick={UpdateCategoryAsync}>
                                        Изменить
                                    </button>
                                </div>
                                <div>
                                    <button onClick={DeleteCategoryAsync}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HandleCategoryComponent;
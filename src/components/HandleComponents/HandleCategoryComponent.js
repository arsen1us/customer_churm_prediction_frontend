import React, {useState, useEffect} from "react";
import axios from "axios";

const HandleCategoryComponent = () => {
    // Название категории
    const [categoryName, setCategoryName] = useState("");
    // Id категории, которая сейчас изменяется
    const [currentCategoryIdEditing, setCurrentCategoryIdEditing] = useState("");
    // Название категории для обновления категории
    const [updateCategoryName, setUpdateCategoryName] = useState("");
    // Список категорий
    const [categoryList, setCategoryList] = useState([]);

    const [isCategoryChanging, setIsCategoryChanging] = useState(false);
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
        catch(error)
        {
            // Внутрянняя ошибка сервера (Internal server error)
            if(error.response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(error.response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
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
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
        }
    }

    // Добавить категорию
    const AddCategoryAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/category", {
                name: categoryName
            }, {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                if(response.data.category)
                    setCategoryList(list => [...list, response.data.category])
            }
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
    const UpdateCategoryAsync = async (categoryId) => {
        try{
            const response = await axios.put(`https://localhost:7299/api/category/${categoryId}`, {
                name: updateCategoryName
                },{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200)
            {
                if(response.data.category)
                    setCategoryList(list => [...list, response.data.category])
            }
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
    const DeleteCategoryAsync = async (categoryId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/category/${categoryId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200) {
                const deletedCount = response.data.deletedCount;
                if(deletedCount > 0){
                    setCategoryList(list => list.filter(category => category.id !== categoryId))
                }
            }
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


    const OpenEditPanel = (currentCategoryId) => {
        setIsCategoryChanging(!isCategoryChanging)
        setCurrentCategoryIdEditing(currentCategoryId)
    }

    useEffect(() => {
        GetCategoryListAsync();
      }, []);

    return (
        <div>
            <div>
                <h3>Страница для работы с категориями</h3>
            </div>
            <div>
                <div>
                    <form method="post"> 
                    <label>Название категории</label>
                    <input 
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="First name"
                    />
                    <button type="submit" onClick={AddCategoryAsync}>
                        Добавить
                    </button>
                    </form>
                </div>
            </div>
            <div>
                <h3>
                    Список категорий
                </h3>
            </div>
            <div>
                <ul>
                    {categoryList.map((category, index) => (
                        <li key={index}>
                            {!isCategoryChanging && currentCategoryIdEditing == category.id ? (
                            <>
                                <div>
                                    <form onSubmit={(async () => await UpdateCategoryAsync(category.id))}>
                                        <label>
                                            Название категории
                                        </label>
                                        <input
                                            type="text"
                                            value={updateCategoryName}
                                            onChange={(e) => setUpdateCategoryName(e.target.value)}
                                            placeholder={category.name}
                                            />
                                        <button type="submit">Подтвердить</button>
                                        <button onClick={OpenEditPanel}>Отменить</button>
                                    </form>
                                </div>
                            </>
                            ) : (
                                <div>
                                    <p>{category.name}</p>
                                    <div>
                                        <div>
                                            <button onClick={(() => OpenEditPanel(category.id))}>
                                                Изменить
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={(async () => await DeleteCategoryAsync(category.id))}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HandleCategoryComponent;
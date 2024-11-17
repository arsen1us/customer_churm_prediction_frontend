import React, { useEffect, useState } from "react";
import axios from "axios";

const HandlePromotionComponent = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [promotionList, setPromotionList] = useState([]);

    const [isPromotionChanging, setIsPromotionChanging] = useState(false);
    const [currentPromotionIdEditing, setCurrentPromotionIdEditing] = useState("");

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
            if(error.response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(error.response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
        }
    }

    // Получить список рекламных постов
    const GetPromotionListAsync = async () => {
        try {
            const response = await axios.get("https://localhost:7299/api/promotion", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200)
            {
                if(response.data.promotionList){
                    setPromotionList(response.data.promotionList);
                }
            }
        }
        catch (error) {
            // Если истёк срок действия токена
            if(error.response && error.response.status === 401) {
                await UpdateToken();
                await GetPromotionListAsync();
            }
            else if(error.response && error.response.status === 500) {

            }
            else if(error.response) {

            }
            else {

            }
        }
    }
    
    // Добавить рекламный пост
    const AddPromotionAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/promotion", {
                title: title,
                content: content,
                imageUrl: imageUrl,
                linkUrl: linkUrl,
                startDate: startDate,
                endDate: endDate
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200)
            {
                setPromotionList(list => [...list, response.data.promotion])
            }
        }
        catch (error) {
            if(error.response && error.response.status === 401) {
                
            }
            else if(error.response && error.response.status === 500) {

            }
            else if(error.response && error.response) {
                console.log(error);
            }
            else {
                console.log(error);
            }
        }
    }
    
    // Обновить рекламный пост
    const UpdatePromotionAsync = async (promotionId) => {
        try{
            const response = await axios.put(`https://localhost:7299/api/promotion/${promotionId}`, {
                title: title,
                content: content,
                imageUrl: imageUrl,
                linkUrl: linkUrl,
                startDate: startDate,
                endDate: endDate
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if(response.status === 200)
            {
                if(response.data.promotion){
                    setPromotionList(list => [...list, response.data.promotion])
                    OpenEditPanel(response.data.promotion.id)
                }
            }
        }
        catch (error) {
            if(error.response.status === 401) {
                
            }
            else if(error.response.status === 500) {

            }
            else if(error.response) {

            }
            else {

            }
        }
    }
    
    // Удалить рекламный пост
    const DeletePromotionAsync = async (promotionId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/promotion/${promotionId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200) {
                const deletedCount = response.data.deletedCount;
                if(deletedCount > 0){
                    setPromotionList(list => list.filter(promotion => promotion.id !== promotionId))
                }
            }
        }
        catch (error) {
            if(error.response.status === 401) {
                
            }
            else if(error.response.status === 500) {

            }
            else if(error.response) {

            }
            else {

            }
        }
    }

    const OpenEditPanel = (currentPromotionId) => {
        setIsPromotionChanging(!isPromotionChanging)
        setCurrentPromotionIdEditing(currentPromotionId)
    }

    useEffect (() => {
        GetPromotionListAsync()
    }, [])
    return (
        <div>
            <div>
                <h3>Страница для работы с рекламой</h3>
            </div>
            <div>
                <h3>Добавить рекламный пост</h3>
            </div>
            <div>
                <div>
                    <form method="post" onSubmit={AddPromotionAsync}>
                        <div>
                            <label>Название поста</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <label>Содержимое посста</label>
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}/>
                        </div>
                        <div>
                            <label> Картинка</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}/>
                        </div>
                        <div>
                            <label>Ссылка, куда ведёт рекламный пост</label>
                            <input
                                type="text"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}/>
                        </div>
                        <div>
                            <label>Дата начала действия рекламы</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}/>
                        </div>
                        <div>
                            <label>Дата окончания действия рекламы</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                        <div>
                            <button type="submit" onClick={AddPromotionAsync}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    <h3>Список рекламных постов</h3>
                </div>
                <div>
                    <ul>
                        {promotionList.map((promotion, index) => (
                            <li key={index}>
                                {isPromotionChanging && currentPromotionIdEditing == promotion.id ? (
                                <>
                                    <div>
                                        <div>
                                            <form method="post" onSubmit={AddPromotionAsync}>
                                                <div>
                                                    <label>Название поста</label>
                                                    <input
                                                        type="text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Содержимое посста</label>
                                                    <input
                                                        type="text"
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label> Картинка</label>
                                                    <input
                                                        type="text"
                                                        value={imageUrl}
                                                        onChange={(e) => setImageUrl(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Ссылка, куда ведёт рекламный пост</label>
                                                    <input
                                                        type="text"
                                                        value={linkUrl}
                                                        onChange={(e) => setLinkUrl(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Дата начала действия рекламы</label>
                                                    <input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}/>
                                                </div>
                                                <div>
                                                    <label>Дата окончания действия рекламы</label>
                                                    <input
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}/>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <button onClick={( async () => UpdatePromotionAsync(promotion.id))}>Сохранить</button>
                                        </div>
                                        <div>
                                            <button onClick={( () => OpenEditPanel(promotion.id))}>Отменить</button>
                                        </div>
                                    </div>
                                </>) : (
                                    <div>
                                        <button onClick={( async () => await OpenEditPanel(promotion.id))}>Изменить</button>
                                        <button onClick={( async () => await DeletePromotionAsync(promotion.id))}>Удалить</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HandlePromotionComponent;
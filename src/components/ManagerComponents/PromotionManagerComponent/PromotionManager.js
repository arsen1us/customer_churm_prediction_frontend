import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../../AuthProvider"

const PromotionManager = () => {

    const {companyId} = useParams();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [promotionList, setPromotionList] = useState([]);

    const [isPromotionChanging, setIsPromotionChanging] = useState(false);
    const [currentPromotionIdEditing, setCurrentPromotionIdEditing] = useState("");

    const [company, setCompany, handleRequestError] = useState(null);

    // Метод для обновления токена
    const {token, refreshToken} = useContext(AuthContext);

    /// summary
    /// Получить компанию по id
    /// summary
    const GetCompanyByIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/${companyId}`, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200) {
                if(response.data.company) {
                    setCompany(response.data.company);
                }
            }
        }
        catch(error){
            await handleRequestError(error);
        }
    }

    /// summary
    /// Получить список рекламных постов по id компании
    /// summary
    const GetPromotionByCompanyIdAsync = async () => {
        try {
            const response = await axios.get(`https://localhost:7299/api/promotion/company/${companyId}`, {
                headers: {
                    "Authorization": "Bearer " + token
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
            await handleRequestError(error);
        }
    }
    
    /// summary
    /// Добавить рекламный пост
    /// summary
    const AddPromotionAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/promotion", {
                title: title,
                content: content,
                imageUrl: imageUrl,
                linkUrl: linkUrl,
                startDate: startDate,
                endDate: endDate,
                companyId: companyId
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response.status === 200)
            {
                setPromotionList(list => [...list, response.data.promotion])
            }
        }
        catch (error) {
            await handleRequestError(error);
        }
    }
    
    /// summary
    /// Обновить рекламный пост
    /// summary
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
                    "Authorization": "Bearer " + token
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
            await handleRequestError(error);
        }
    }
    
    /// summary
    /// Удалить рекламный пост
    /// summary
    const DeletePromotionAsync = async (promotionId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/promotion/${promotionId}`, {
                headers: {
                    "Authorization": "Bearer " + token
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
            await handleRequestError(error);
        }
    }

    const OpenEditPanel = (currentPromotionId) => {
        setIsPromotionChanging(!isPromotionChanging)
        setCurrentPromotionIdEditing(currentPromotionId)
    }

    useEffect (() => {
        GetPromotionByCompanyIdAsync()
        GetCompanyByIdAsync();
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
                                                    <label>Содержимое поста</label>
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

export default PromotionManager;
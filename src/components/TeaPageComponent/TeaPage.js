import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/**
 * Компонент для отображения страницы с чаем
 * @returns 
 */
const TeaPage = () => {

    const {user, token, handleRequestError} = useContext(AuthContext);
    /**Чай */
    const [tea, setTea] = useState();

    /**Получает id чая из параметра */
    const {teaId} = useParams();

    /**
     * Загружает чай по id
     */
    const GetTeaByIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/tea/${teaId}`, {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.tea){
                    setTea(response.data.tea)
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Добавить чай в корзину
     * @param {*} e 
     */
    const AddTeaToCartAsync = async () => {
        try{
            const response = await axios.post("https://localhost:7299/api/cart", {
                userId: user.id,
                productId: tea.id
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.cart){
                    alert("Чай успешно добавлен в корзину!");
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Загружает чай по полученному из параметра id при инициализации компонента
     */
    useEffect(() => {
        if(teaId){
            GetTeaByIdAsync();
        }
    }, [teaId]);

    return (
        <div className="container my-5">
            <h1 className="mb-4">Страница отображения чая</h1>
            {tea ? (
                <>
                    {/* Карусель изображений */}
                    {tea.imageSrcs && tea.imageSrcs.length > 0 && (
                        <div id="teaCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {tea.imageSrcs.map((src, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={index}
                                    >
                                        <img
                                            src={`https://localhost:7299/uploads/${src}`}
                                            className="d-block w-100"
                                            alt={`tea-${index}`}
                                            style={{ maxHeight: "400px", objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#teaCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Предыдущий</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#teaCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Следующий</span>
                            </button>
                        </div>
                    )}

                    {/* Информация о чае */}
                    <div className="card p-4 shadow-sm">
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Название:</div>
                            <div className="col-sm-8">{tea.name}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Цена:</div>
                            <div className="col-sm-8">{tea.price} ₽</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Количество:</div>
                            <div className="col-sm-8">{tea.count}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Описание:</div>
                            <div className="col-sm-8">{tea.description}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Тип упаковки:</div>
                            <div className="col-sm-8">{tea.packageType}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Материалы упаковки:</div>
                            <div className="col-sm-8">{tea.packageMaterials}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Вес:</div>
                            <div className="col-sm-8">{tea.weight}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Инфо о весе:</div>
                            <div className="col-sm-8">{tea.weightDetails}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4 fw-bold">Категория ID:</div>
                            <div className="col-sm-8">{tea.categoryId}</div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm-4">
                            <button 
                                className="btn btn-outline-primary w-100 fw-bold"
                                onClick={AddTeaToCartAsync}>
                                Добавить в корзину
                            </button>
                        </div>
                        <div className="col-sm-8">
                            <button className="btn btn-primary w-100">
                                Заказать
                            </button>
                        </div>
                    </div>
                </>
            ): (
                <>
                    <p>Загрузка чая</p>
                </>)}
        </div>
    );
};

export default TeaPage;
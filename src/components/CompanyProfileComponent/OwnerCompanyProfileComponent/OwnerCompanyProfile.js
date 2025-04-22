import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import {AuthContext} from "../../../AuthProvider"
import OrderList from "../../ListComponents/OrderList";
import CouponList from "../../ListComponents/CouponList";
import "./OwnerCompanyProfile.css"


/**
 * Компонент профиля компании для владельца компании
 */
const OwnerCompanyProfile = () => {
    const [orderList, setOrderList] = useState([]);
    const {ownedCompany, token, handleRequestError} = useContext(AuthContext);
    /**Список чаёв */
    const [teas, setTeas] = useState([]);

    /**
     * Загружает список заказов
     */
    // const GetOrdersAsync = async () => {
    //     try{
    //         const response = await axios.get(`https://localhost:7299/api/order/company/${ownedCompany.id}`, {
    //             headers: {
    //                 "Authorization": "Bearer " + token
    //             }
    //         });
    //         if(response && response.status === 200){
    //             if(response.data.orderList){
    //                 setOrderList(response.data.orderList);
    //             }
    //         }
    //     }
    //     catch (error){
    //         await handleRequestError(error);
    //     }
    // }

    /**
     * Загружает список чая
     */
    const GetTeasAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/tea", {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.teas){
                    setTeas(response.data.teas)
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    };

    /**
     * Загружает список чая и список заказов при инициализации компонента
     */
    useEffect(() => {
        GetTeasAsync();
        // GetOrdersAsync();
    }, [])

    return (
        <div>
            <div className="company-container">
                {ownedCompany ? (
                    <>
                        <div className="company-left">
                            {/* Левая часть: информация и настройки */}
                            <div className="company-info">

                                <div>
                                    {ownedCompany.imageSrcs && ownedCompany.imageSrcs.map((src, index) => (
                                        <div key={index} className="company-avatar">
                                            <img 
                                                src={`https://localhost:7299/uploads/${src}`}
                                                alt={`Image ${index}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4>{ownedCompany.name}</h4>
                                </div>

                                <div>
                                    <p>{ownedCompany.description}</p>
                                </div>
                            </div>
                                
                            <div className="company-settings">
                                <h3>Настройки компании</h3>
                                <Link to={`/company-settings/${ownedCompany.id}`}>Перейти к настройкам</Link>
                                <h3>Управление рекламой</h3>
                                <Link to={`/promotion/${ownedCompany.id}`}>Перейти к настройке рекламы</Link>
                                <h3>Управление купонами</h3>
                                <Link to={`/coupon/${ownedCompany.id}`}>Перейти к настройке купонов</Link>
                                <h3>Временный список купонов</h3>
                                <CouponList/>
                                <h3>Управление категориями чая</h3>
                                <Link to={"/category-add"}>Добавить категорию</Link>
                            </div>
                        </div>
                                
                        <div className="company-right">

                            {/* Правая часть: заказы и продукты */}
                            <div className="company-orders">
                                <h4>Нормальный список заказов</h4>
                                <OrderList orders={orderList}/>
                            </div>
                            
                            <div className="company-products">
                                <h3>Список созданных чаёв</h3>
                                <Link to="/tea-add">Создать чай</Link>
                                <div>
                                    <h1>Список чая</h1>
                                    <div className="container my-5">
                                        <div className="row g-4">
                                            {teas.map((tea, index) => (
                                                <div className="col-md-4" key={index}>
                                                    <div className="card h-100 shadow-sm">
                                                        <Link to={`/tea/${tea.id}`}>
                                                        <img
                                                            src={`https://localhost:7299/uploads/${tea.imageSrcs[0]}`}
                                                            alt={tea.name}
                                                            className="card-img-top"
                                                            style={{ height: '200px', objectFit: 'cover' }}
                                                        />
                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title">{tea.name}</h5>
                                                            <p className="card-text">Цена: {tea.price} ₽</p>
                                                        </div>
                                                        </Link>
                                                        <div className="mt-auto d-flex justify-content-between">
                                                            <button className="btn btn-outline-secondary">
                                                                Редактировать
                                                            </button>
                                                            <button className="btn btn-primary">
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Информация о компании не найдена</p>
                )}
            </div>
        </div>
    );
}

export default OwnerCompanyProfile;
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../ListItemComponents/ProductItemComponent/ProductItem";
import OrderItem from "../ListItemComponents/OrderItem";

import {AuthContext} from "../../AuthProvider"
import OrderList from "../ListComponents/OrderList";
import CouponList from "../ListComponents/CouponList";
import "./OwnerCompanyProfile.css"

/**
 * Компонент владельца компании
 */
const OwnerCompanyProfile = () => {
    const [orderList, setOrderList] = useState([]);
    const [productList, setProductList] = useState([]);
    const {ownedCompany, token, handleRequestError} = useContext(AuthContext);

    /**
     * Получить список заказов
     */
    const GetOrderListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/order/company/${ownedCompany.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data.orderList){
                    setOrderList(response.data.orderList);
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Получить список продуктов по id компании
     */
    const GetProductListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/company/${ownedCompany.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200){
                if(response.data.productList){
                    setProductList(response.data.productList);
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Загрузить список продуктов и заказов при монтировании компонента
     */
    useEffect(() => {
        GetProductListByCompanyIdAsync();
        GetOrderListByCompanyIdAsync();
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
                            </div>
                        </div>
                                
                        <div className="company-right">

                            {/* Правая часть: заказы и продукты */}
                            <div className="company-orders">
                                <h4>Нормальный список заказов</h4>
                                <OrderList orders={orderList}/>
                            </div>
                            
                            <div className="company-products">
                                <h3>Список продуктов</h3>
                                <Link to="/addproduct">Добавить продукт</Link>
                                <ul>
                        <div
                            style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 
                                'repeat(auto-fill, minmax(200px, 1fr))', 
                                gap: '20px', margin: '20px 30px 0px 0px' }}>
                            {productList.map((product, index) => {
                                return (
                                    <li key={index}>
                                        {product.name && (
                                            <ProductItem product={product}/>
                                        )}
                                    </li>
                                );
                        })}
                        </div>
                    </ul>
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
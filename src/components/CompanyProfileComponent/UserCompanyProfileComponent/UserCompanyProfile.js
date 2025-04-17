import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {AuthContext} from "../../../AuthProvider"
import "./UserCompanyProfile.css"
import ProductItem from "../../ListItemComponents/ProductItemComponent/ProductItem";

/**
 * Компонент профиля компании для обычного пользователя
 */
const UserCompanyProfile = ({company}) => {
    const [productList, setProductList] = useState([]);
    const {ownedCompany, token, handleRequestError} = useContext(AuthContext);

    /**
     * Получить список продуктов по id компании
     */
    const GetProductListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/company/${company.id}`, {
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
    }, [])

    return (
        <div>
            <div className="company-container">
                {company ? (
                    <>
                        <div className="company-left">
                            {/* Левая часть: информация и настройки */}
                            <div className="company-info">

                                <div>
                                    {company.imageSrcs && company.imageSrcs.map((src, index) => (
                                        <div key={index} className="company-avatar">
                                            <img 
                                                src={`https://localhost:7299/uploads/${src}`}
                                                alt={`Image ${index}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4>{company.name}</h4>
                                </div>

                                <div>
                                    <p>{company.description}</p>
                                </div>
                            </div>
                        </div>
                                
                        <div className="company-right">

                            {/* Правая часть: продукты */}
                            
                            <div className="company-products">
                                <h3>Список продуктов</h3>
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

export default UserCompanyProfile;
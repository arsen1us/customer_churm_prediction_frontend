import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Компонент для отображения списка чая
 * @returns 
 */
const TeaList = () => {
    
    const {user, token, handleRequestError} = useContext(AuthContext);
    /**Список чаёв */
    const [teas, setTeas] = useState([]);

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
                    setTeas(response.data.teas);
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    };

    /**
     * Добавляет чай в корзину 
     * @param {*} teaId 
     */
    const AddToCartAsync = async (teaId) => {
        console.log(user);
            console.log(token);
            console.log(teaId)
        try{
            const response = await axios.post("https://localhost:7299/api/cart",{
                userId: user.id,
                teaId: teaId
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.cart){
                    alert("Товар успешно добавлен в корзину!")
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    const ConsoleLog = async (e) => {
        console.log(e);
    }
    /**
     * Загружает список чая при инициализации компонента
     */
    useEffect(() => {
        GetTeasAsync();
    }, []);

    return (
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
                                    <button className="btn btn-outline-secondary" onClick={() => AddToCartAsync(tea.id)}>
                                        Добавить в корзину
                                    </button>
                                    <button className="btn btn-primary">
                                        Заказать
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeaList;
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Popup from "../PopupComponent/Popup";
import ImageSlider from "../ImageSliderComponent/ImageSlider";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";
import DateRangeDropdown from "../DateRangeDropdown";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Компонент для отображения страницы с продуктом
const ProductPage = () => {

    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);
    const {trackUserAction} = useTracking();
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [company, setCompany] = useState(null);

    const [quantity, setQuantity] = useState(0);

    // Статус заказа (успешно/не успешно создан)
    const [orderStatus, setOrderStatus] = useState(false);

    // Темплейт для отображения изображений (временное решение, думаю)
    const imageTemplate = "https://localhost:7299/uploads/";

    /**
     * Получить продукт по id
     * @param {*} e 
     */
    const GetProductByIdAsync = async (productId) => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/${productId}`, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200) {
                if(response.data.product) {
                    console.log(response.data.product);
                    setProduct(response.data.product);
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Получить компанию по id
     * @param {*} e 
     */
    const GetCompanyByProductIdAsync = async () => {
        try{
                const response = await axios.get(`https://localhost:7299/api/company/product/${productId}`, {
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
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Заказать продукт
     * @param {*} e 
     */
    const OrderProductAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/order", {
                userId: user.id,
                items: [{
                    productId: product.id,
                    quantity: quantity,
                    companyId: product.companyId
                }]
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            if(response && response.status === 200)
            {
                if(response.data && response.data.orderStatus) {
                    setOrderStatus(response.data.orderStatus);
                    alert(`Заказ успешно создан. Статус заказа - ${response.data.orderStatus}`);
                    
                    await trackUserAction("CreateOrder", {

                    });
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Добавить продукт в корзину
     * @param {*} e 
     */
    const AddProductToCartAsync = async () => {
        try{
            const response = await axios.post("https://localhost:7299/api/cart", {
                userId: user.id,
                productId: productId
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.cart){
                    await trackUserAction("AddToCart", {
                        productId: productId
                    });
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Добавить отзыв на продукт
     * @param {*} e 
     */
    const AddReviewForProduct = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/review", {
                userId: user.id,
                productId: product.id,
                text: reviewText,
                grade: reviewGrade
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            if(response && response.status === 200){
                if(response.data && response.data.review)
                    alert("Отзыв успешно добавлен!");
            }
                
            
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Загрузить отзвы для продуктов
     */
    const LoadReviewsForProduct = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/review/${productId}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.reviewModelList)
                    setReviewModelList(response.data.reviewModelList);
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    useEffect(() => {
        if(productId){
            // получить инфу о продукте
            GetProductByIdAsync(productId);
            // получить список отзывов на продукт
            LoadReviewsForProduct();
            // получить 
            GetCompanyByProductIdAsync();
        }
    }, [productId])

    // Управление popup ===================================

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const [reviewText, setReviewText] = useState("");
    const [reviewGrade, setReviewGrade] = useState(1);
    const [reviewModelList, setReviewModelList] = useState([]);

    // Управление popup ===================================

    return (
        <div>
            {product ? (
                <div>
                    <div>
                        <div>
                            <h1>{product.name}</h1>
                        </div>

                        <div>
                            <ImageSlider imageSrcs={product.imageSrcs}/>
                        </div>

                        <div>
                            <p><strong>Описание:</strong> {product.description || "Нет описания"}</p>
                        </div>

                        <div>
                            <p><strong>Цена:</strong> {product.price} ₽</p>
                        </div>

                        <div>
                            <p><strong>Категория ID:</strong> {product.categoryId}</p>
                        </div>

                        <div>
                            <p><strong>Категория ID:</strong> {product.categoryId}</p>
                        </div>

                        <div>
                            <p><strong>Количество покупок:</strong> {product.purchaseCount}</p>
                        </div>

                        <div>
                            <p><strong>Частота покупок:</strong> {product.purchaseFrequency}</p>
                        </div>

                        <div>
                        <p><strong>Среднее количество заказов:</strong> {product.averageOrderValue}</p>
                        </div>
                        
                    </div>

                    <div>
                        <div>
                            <form method="post" onSubmit={OrderProductAsync}>
                                <div>
                                    <label>Количество продукта</label>
                                    <input 
                                        text="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <button type="submit">Заказать</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <button onClick={AddProductToCartAsync}>Добавить в корзину</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Загрузка продукта...</p>
            )}
            <div>

                <div>
                    {company ? (
                        <>
                            <Link to={`/company/${company.id}`}>
                                <div>
                                    {company.imageSrcs ? (
                                        <>
                                        {company.imageSrcs.map((src, index) => (
                                            <div>
                                                <img 
                                                    key={index} 
                                                    src={`https://localhost:7299/uploads/${src}`}
                                                    alt={`Image ${index}`}
                                                    width="50px"
                                                    style={{
                                                        borderRadius: "50%", // Делает изображение круглым
                                                        width: "50px", // Задаём ширину
                                                        height: "50px", // Задаём высоту (должна быть равна ширине для круга)
                                                        objectFit: "cover", // Обрезает изображение, чтобы не искажалось
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        </>
                                    ) : (
                                        <>
                                            Не удалось загрузить изображение 
                                        </>
                                    )}
                                </div>

                                <div>
                                    Company name: {company.name}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            Не удалось загрузить информацию о компании
                        </>
                    )}
                </div>

                <div>
                    <div>
                        <p>Отзывы на продукт</p> 
                    </div>

                    <div>
                        <button onClick={openPopup}>Оставить отзыв для продукта</button>

                        <Popup isOpen={isPopupOpen} onClose={closePopup} title="Оставить отзыв">
                            <form method="post" onSubmit={AddReviewForProduct}>
                                <div>
                                    <label>Ваш отзыв</label>
                                    <textarea 
                                        type="text"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Напишите отзыв" 
                                        rows="5"></textarea>
                                </div>

                                <div>
                                    <label>Оценка</label>
                                    <input 
                                        type="number"
                                        value={reviewGrade}
                                        onChange={(e) => setReviewGrade(e.target.value)}
                                        max="5" min="1"
                                        placeholder="Оцените от 1 до 5" />
                                </div>

                                <div>
                                    <button type="submit">Отправить</button>
                                </div>
                            </form>
                        </Popup>
                    </div>

                    <div>
                        {reviewModelList.map((reviewModel, index) => (
                            <div key={index}>
                                <div>
                                    <Link key={index} to="/profile">
                                            {reviewModel.user.imageSrcs.map((src, index) => (
                                                <div>
                                                    <img 
                                                        key={index} 
                                                        src={`https://localhost:7299/uploads/${src}`}
                                                        alt={`Image ${index}`}
                                                        width="50px"
                                                        style={{
                                                            borderRadius: "50%", // Делает изображение круглым
                                                            width: "50px", // Задаём ширину
                                                            height: "50px", // Задаём высоту (должна быть равна ширине для круга)
                                                            objectFit: "cover", // Обрезает изображение, чтобы не искажалось
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            {reviewModel.user.firstName} {reviewModel.user.lastName}
                                    </Link>
                                </div>
                                <div>
                                    <div>
                                        <p>Текст отзыва - {reviewModel.review.text}</p>
                                    </div>
                                    <div>
                                        <p>Оценка - {reviewModel.review.grade}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
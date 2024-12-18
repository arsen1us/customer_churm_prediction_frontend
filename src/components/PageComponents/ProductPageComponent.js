import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Popup from "../Popup";
import ImageSlider from "../Slider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Компонент для отображения страницы с продуктом
const ProductPageComponent = () => {

    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [company, setCompany] = useState(null);

    const [productCount, setProductCount] = useState(0);

    // Статус заказа (успешно/не успешно создан)
    const [orderStatus, setOrderStatus] = useState(false);

    // Темплейт для отображения изображений (временное решение, думаю)
    const imageTemplate = "https://localhost:7299/uploads/";

    ///summary
    /// Обновить токен
    ///summary
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
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// summary
    /// Получить продукт по id
    /// summary
    const GetProductByIdAsync = async (productId) => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/${productId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
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

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Получить компанию по id
    /// </summary>
    const GetCompanyByProductIdAsync = async () => {
        try{
                const response = await axios.get(`https://localhost:7299/api/company/product/${productId}`, {
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
    
                if(response && response.status === 200) {
                    if(response.data.company) {
                        setCompany(response.data.company);
                    }
                }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// summary
    /// Заказать товар
    /// summary
    // Цена товара 
    // Количество товара => цена товара 
    // Создать и отправить запрос на сервак => отобразить инфу о заказе на странице компании (послать уведомление о том, что заказали продукт)
    // Списать кэш с баланса юзера 
    const OrderProductAsync = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.post("https://localhost:7299/api/order", {
                        productId: product.id,
                        productCount: productCount,
                        companyId: product.companyId, //product.companyId,
                        userId: decodedToken.Id,
                        price: product.price
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    
                    if(response && response.status === 200)
                    {
                        // обработать успешное создание заказа
                        if(response.data && response.data.orderStatus) {
                            setOrderStatus(response.data.orderStatus)
                            alert(`Заказ успешно создан. Статус заказа - ${response.data.orderStatus}`)
                        }
                    }

                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Добавить продукт в корзину
    /// </summary>
    const AddProductToCartAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.post("https://localhost:7299/api/cart", {
                        userId: decodedToken.Id,
                        productId: productId
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    if(response && response.status === 200){
                        if(response.data && response.data.cart){
                            alert("Продукт успешно добавлен в корзину");
                        }
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Добавить отзыв на продукт
    /// <summary>
    const AddReviewForProduct = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.post("https://localhost:7299/api/review", {
                        userId: decodedToken.Id,
                        productId: product.id,
                        text: reviewText,
                        grade: reviewGrade
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });

                    if(response && response.status === 200){
                        if(response.data && response.data.review)
                            alert("Отзыв успешно добавлен!");
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Добавить отзыв на продукт
    /// <summary>
    const LoadReviewsForProduct = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/review/${productId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.reviewModelList)
                    setReviewModelList(response.data.reviewModelList);
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Произошла ошибка во время получения списка отзывов. Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!" + error);
            }
        }
    }


    /// <summary>
    /// Добавить действие Добавить в корзину
    /// </summary>
    const AddActionAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.get(`https://localhost:7299/api/user-action/add-to-cart`,{
                        userId: decodedToken.Id,
                        productId: productId
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    if(response && response.status === 200){
                        if(response.data && response.data.isSuccess === true)
                            alert("Действие Добавить в корзину было успешно добавлено")
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Произошла ошибка во время получения списка отзывов. Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!" + error);
            }
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
                                        value={productCount}
                                        onChange={(e) => setProductCount(e.target.value)}
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

export default ProductPageComponent;
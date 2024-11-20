import React, {useState, useEffect} from "react";
import axios from "axios";
import CategoryListComponent from "./CategoryListComponent";

// special for drop down
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PromotionComponent from "../PromotionComponent";


const ProductListComponent = () => {

    const {categoryId} = useParams();
    const [productList, setProductList] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    // Номер страницы
    const[pageNumber, setPageNumber] = useState(0);
    // Количество продуктов на странице
    const[pageSize, setPageSize] = useState(15);

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

    const LoadProductAsync = async () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        await FetchProductsAsync();
    }

    const FetchProductsAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/${pageNumber}/${pageSize}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                if(response.data.productList) {
                    setProductList(list => [...list, ...response.data.productList])    
                }
            }
        }
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401) {
                await UpdateToken();
                await FetchProductsAsync();
            }

            // Ошибка сервера
            if(error.response && error.response.status === 500)
            {

            }
        }
    }

    // Получить список категорий по id категории
    const GetProductListByCategoryIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/category/${categoryId}`, {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
                }
            });
            
            if(response.status === 200)
            {
                const responseData = response.data.productList;
                if(response.data.productList)
                {
                    setProductList(responseData);
                }
            }
        }
        catch (error)
        {
            if(categoryId != null && categoryId != "")
            {
                // Если токен истёк или не зарегистировался/вошёл
                if(error.response && error.response.status === 401)
                {
                    await UpdateToken();
                    await GetProductListByCategoryIdAsync();
                }
            }
        }
    }

    const ChangeCurrentCategory = (name) => {
        if(name)
            setCategoryName(name);
        console.log(name);
    }

    // Получить список продуктов при загрузке страницы
    useEffect(() => {
        if(categoryId){
            GetProductListByCategoryIdAsync();
        }
        else{
                FetchProductsAsync();
            }
      }, []);

    return (
        <div>
            <div>
                <h3>
                    Список Продуктов
                </h3>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <h3>Выберите категорию</h3>
                        </div>
                        <div>
                            <CategoryListComponent/>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>
                        Список Продуктов
                    </h3>
                </div>
                <div>
                    <input type="text" value={categoryName} placeholder={categoryName}/>
                    <ul>
                        {productList.map((product, index) => (
                            <li key={index}>
                                <div>
                                    <button onClick={(() => ChangeCurrentCategory(product.name))}>{product.name}</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <div>
                            <PromotionComponent/>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={(async () => await LoadProductAsync())} >
                        Загрузить ещё
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductListComponent;
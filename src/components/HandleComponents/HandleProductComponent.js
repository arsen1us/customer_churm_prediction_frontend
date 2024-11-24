import React, {useState, useEffect} from "react";
import axios from "axios";
import CategoryListComponent from "../ListComponents/CategoryListComponent";

const HandleProductComponent = () => {
    
    const [currentProductIdEditing, setCurrentProductIdEditing] = useState("");
    const [isProductChanging, setIsProductChanging] = useState(false);

    const [updateProductName, setUpdateProductName] = useState("");

    // Наименование продукта
    const [productName, setProductName] = useState("");
    // Описание продукта
    const [description, setDescription] = useState("");
    // Id категории
    const [categoryId, setCategoryId] = useState("");
    // Цена товара 
    const [price, setPrice] = useState("");

    const [productList, setProductList] = useState([]);

    // companyId по умолчанию - 67431437a422c6e797c334de
    const [companyId, setCompanyId] = useState("67431437a422c6e797c334de");

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

    // Получить список категорий 
    const GetProductListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/product");

            if(response.status === 200)
            {
                const responseData = response.data.productList;
                if(response.data.productList)
                {
                    setProductList(responseData);
                }
            }
        }
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
        }
    }

    // Добавить продукт
    const AddProductAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/product", {
                name: productName,
                description: description,
                categoryId: categoryId,
                price: price,
                companyId: companyId
            }, {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                if(response.data.product)
                    setProductList(list => [...list, response.data.product])
            }
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }

    // Изменить продукт
    const UpdateProductAsync = async (productId) => {
        try{
            const response = await axios.put(`https://localhost:7299/api/product/${productId}`, {
                name: updateProductName,
                // description: description,
                // categoryId: categoryId,
                // price: price
                },{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200)
            {
                if(response.data.product)
                    setProductList(list => [...list, response.data.product])
            }
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }

    // Удалить категорию
    const DeleteProductAsync = async (productId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/product/${productId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response.status === 200) {
                const deletedCount = response.data.deletedCount;
                if(deletedCount > 0){
                    setProductList(list => list.filter(product => product.id !== productId))
                }
            }
        }
        catch (error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
                await UpdateToken();
            // Внутрянняя ошибка сервера (Internal server error)
            else if(error.response && error.response.status === 500)
            {
                console.log(error);
            }
            else{
                console.log(error);
            }
        }
    }


    const OpenEditPanel = (currentProductId) => {
        setIsProductChanging(!isProductChanging)
        setCurrentProductIdEditing(currentProductId)
    }

    useEffect(() => {
        GetProductListAsync();
      }, []);

    return (
        <div>
            <div>
                <h3>Страница для работы с продуктами</h3>
            </div>
            <div>
                <div>
                    <h3>Добавить продукт</h3>
                </div>
                <div>
                    <div>
                        <form method="post"> 
                            <div>
                                <label>Название </label>
                                <input 
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="Введите название"
                                />
                            </div>
                            <div>
                                <label>Описание</label>
                                <input 
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание"
                                />
                            </div>
                            <div>
                                <label>Id категории</label>
                                <input 
                                    type="text"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    placeholder="Укажите id категории"
                                />
                                <div>
                                    <CategoryListComponent/>
                                </div>
                            </div>
                            <div>
                                <label>Цена</label>
                                <input 
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Укажите цену"
                                />
                            </div>
                            <div>
                                <label>Id компании</label>
                                <input 
                                    type="number"
                                    value={companyId}
                                    onChange={(e) => setCompanyId(e.target.value)}
                                    placeholder="Укажите цену"
                                />
                            </div>
                            <div>
                                <button type="submit" onClick={AddProductAsync}>
                                    Добавить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <h3>
                    Список товаров
                </h3>
            </div>
            <div>
                <ul>
                    {productList.map((product, index) => (
                        <li key={index}>
                            {!isProductChanging && currentProductIdEditing === product.id ? (
                            <>
                                <div>
                                    <form onSubmit={(async () => await UpdateProductAsync(product.id))}>
                                        <label>
                                            Название продукта
                                        </label>
                                        <input
                                            type="text"
                                            value={updateProductName}
                                            onChange={(e) => setUpdateProductName(e.target.value)}
                                            placeholder={product.name}
                                            />
                                        <button type="submit">Подтвердить</button>
                                        <button onClick={OpenEditPanel}>Отменить</button>
                                    </form>
                                </div>
                            </>
                            ) : (
                                <div>
                                    <p>{product.name}</p>
                                    <div>
                                        <div>
                                            <button onClick={(() => OpenEditPanel(product.id))}>
                                                Изменить
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={(async () => await DeleteProductAsync(product.id))}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HandleProductComponent;
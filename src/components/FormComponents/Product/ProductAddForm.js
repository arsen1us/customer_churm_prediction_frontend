import { useParams } from "react-router-dom";
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

import Popup from "../../PopupComponent/Popup";
import { AuthContext } from "../../../AuthProvider"

const ProductAddForm = () => {

    const {user, token, refreshToken} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [companyId, setCompanyId] = useState("");

    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();

    /// <summary>
    /// Получить список категорий
    /// </summary>
    const GetCategoryListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/category", {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.categoryList){
                    setCategoryList(response.data.categoryList)
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
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
    /// Добавить продукт
    /// </summary>
    const AddProductAsync = async (e) => {
        e.preventDefault();
        try{
            const decodedToken = jwtDecode(token);
    
            if (decodedToken.CompanyId) {

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append("name", name);
            formData.append("description", description);
            formData.append("categoryId", categoryId);
            formData.append("count", count);
            formData.append("price", price);
            formData.append("companyId", decodedToken.CompanyId);
            formData.append("userId", decodedToken.Id);

                const response = await axios.post("https://localhost:7299/api/product", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + token
                    }
                });

                if (response.status && response.status === 200) {
                    if (response.data.product) {
                        alert("Продукт успешно добавлен!")
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
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
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!" + error);
            }
        }
    }

    const HandleSelect = (categoryId) => {
        setCategoryId(categoryId)
    }

    useEffect(() => {
        GetCategoryListAsync();
    }, [])

    // =====================================================================

    const [selectedFiles, setSelectedFiles] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // Сохраняем все выбранные файлы
    };

    // =====================================================================

    return (
        <div>
            <div>
                <div>
                    <h3>Добавить продукт</h3>
                </div>
                <div>
                    <div>
                        <form method="post" onSubmit={AddProductAsync}> 

                            <div>
                                <label>Название </label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                <h2>Загрузить изображения (для нескольких)</h2>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange} />
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
                                    <Dropdown onSelect={HandleSelect}>
                                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Выберите категорию
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        {categoryList.map((category) => (
                                            <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                                        ))}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>

                            <div>
                                <label>Количество</label>
                                <input 
                                    type="number"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                    placeholder="Количество"
                                />
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
                                <button type="submit">Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductAddForm;

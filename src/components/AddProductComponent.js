import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';


const AddProductComponent = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState(0);
    const [companyId, setCompanyId] = useState("");

    const [categoryList, setCategoryList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("Выберите категорию")

    const navigate = useNavigate();

    /// <summary>
    /// Обновить токен
    /// </summary>
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

    /// <summary>
    /// Получить список категорий
    /// </summary>
    const GetCategoryListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/category", {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
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
    /// Добавить продукт
    /// </summary>
    const AddProductAsync = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");

            if(token){
                // декодирование токена
                const decodedToken = jwtDecode(token);
                // id - пользователя
                if(decodedToken.CompanyId){
                    const response = await axios.post("https://localhost:7299/api/product", {
                        name: name,
                        description: description,
                        categoryId: categoryId,
                        price: price,
                        companyId: decodedToken.CompanyId
                    }, {
                        headers: {
                            "Authorization": "Bearer" + localStorage.getItem("token")
                        }
                    });
                
                    if(response.status === 200)
                    {
                        if(response.data.product){

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

    const HandleSelect = (categoryId) => {
        setCategoryId(categoryId)
    }

    useEffect(() => {
        GetCategoryListAsync();
    }, [])

    // =====================================================================

    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleUpload = async () => {
      if (!selectedFile || selectedFile.length === 0) {
        alert("Выберите изображение перед загрузкой");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", selectedFile); // Добавляем файл с ключом "image"
  
      try {
        const response = await axios.post("https://localhost:7299/api/image/upload", {
          file: formData 
          }, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 200) {
          alert("Изображение успешно загружено!");
        }
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
        alert("Не удалось загрузить изображение.");
      }
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
                              <h2>Загрузить изображение</h2>
                              <input 
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setSelectedFile(e.target.files[0])} />
                              <button onClick={handleUpload}>Загрузить</button>
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

export default AddProductComponent;

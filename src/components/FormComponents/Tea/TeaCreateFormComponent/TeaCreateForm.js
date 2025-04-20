import { useParams } from "react-router-dom";
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

import { AuthContext } from "../../../../AuthProvider";

/**
 * Компонент с формой для создания чая
 * @returns 
 */
const TeaCreateForm = () => {

    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);

    /**Список категорий чая */
    const [categoryList, setCategoryList] = useState([]);

    /**Название чая */
    const [name, setName] = useState("");
    /**Цена чая */
    const [price, setPrice] = useState("");
    /**Описание */
    const [description, setDescription] = useState("");
    /**Тип упаковки */
    const [packageType, setPackageType] = useState("");
    /**Материал упаковки */
    const [packageMaterials, setPackageMaterials] = useState("");
    /**Вес чая */
    const [weight, setWeight] = useState("");
    /**Детали веса чая */
    const [weightDetails, setWeightDetails] = useState("");
    /** Id категории чая */
    const [categoryId, setCategoryId] = useState("");
    /** Количество шт. */
    const [count, setCount] = useState(0);
    /**
     * Загруженные изображения
     */
    const [selectedFiles, setSelectedFiles] = useState(null);
    const navigate = useNavigate();

    /**
     * Загружает список категорий чая 
     */
    const GetCategoryListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/category", {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.categories){
                    setCategoryList(response.data.categories)
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * Добавляет чай
     * @param {*} e 
     */
    const AddTeaAsync = async (e) => {
        e.preventDefault();
        try{
            const decodedToken = jwtDecode(token);
    
            if (decodedToken.CompanyId) {

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append("name", name);
            formData.append("price", price);
            formData.append("packageType", packageType);
            formData.append("packageMaterials", packageMaterials);
            formData.append("weight", weight);
            formData.append("weightDetails", weightDetails);
            formData.append("categoryId", categoryId);
            formData.append("count", count);
            formData.append("description", description)
            
            
                const response = await axios.post("https://localhost:7299/api/tea", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + token
                    }
                });
                console.log(response);
                if (response.status && response.status === 200) {
                    if (response.data && response.data.tea) {
                        alert("Чай успешно создан!")
                    }
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /**
     * 
     * @param {*} categoryId 
     */
    const HandleSelect = (categoryId) => {
        setCategoryId(categoryId)
    }

    /**
     * Загружает категории чая при инициализации компонента
     */
    useEffect(() => {
        GetCategoryListAsync();
    }, [])
  
    /**
     * Обрабатывает выбор изображений
     * @param {*} event 
     */
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (
        <div>
            <div className="container my-5">
                <h3 className="mb-4">Добавить Чай</h3>
                <form method="post" onSubmit={AddTeaAsync}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Название</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Введите название"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Описание</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Введите описание"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Тип упаковки</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={packageType}
                                onChange={(e) => setPackageType(e.target.value)}
                                placeholder="Введите тип упаковки"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Материалы упаковки</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={packageMaterials}
                                onChange={(e) => setPackageMaterials(e.target.value)}
                                placeholder="Введите материалы упаковки"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Вес продукта</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Введите вес"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Доп. информация о весе</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={weightDetails}
                                onChange={(e) => setWeightDetails(e.target.value)}
                                placeholder="Введите доп. информацию"
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <label className="form-label">Изображения</label>
                            <input 
                                type="file"
                                className="form-control"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label d-block">Категория</label>
                            <Dropdown onSelect={HandleSelect}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Выберите категорию
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categoryList.map((category) => (
                                        <Dropdown.Item key={category.id} eventKey={category.id}>
                                            {category.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {categoryId ? (
                                <>
                                    Выбранная категория: {categoryId}
                                </>
                                ): (
                                <>
                                </>)}
                        </div>
                                
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Количество</label>
                            <input 
                                type="number"
                                className="form-control"
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                placeholder="Количество"
                            />
                        </div>
                                
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Цена</label>
                            <input 
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Укажите цену"
                            />
                        </div>
                                
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-success">
                                Добавить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TeaCreateForm;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../AuthProvider"

const CouponAddForm = () => {

    // Список продуктов
    const [productList, setProductList] = useState([]);
    // Список купонов
    const [couponList, setCouponList] = useState([]);

    // Создание
    // Ключ для активации
    const[key, setKey] = useState("");
    // Выбранные продукты
    const [selectedProducts, setSelectedProducts] = useState([]);
    // Дата начала действия купона
    const[selectedStartDate, setSelectedStartDate] = useState();
    // Дата окончания действия купона
    const[selectedEndDate, setSelectedEndDate] = useState();

    // Изменение
    const[updateKey, setUpdateKey] = useState("");
    const[updateProductIds, setUpdateProductIds] = useState([]);
    const[updateCategoriesIds, setUpdateCategoriesIds] = useState([]);

    const [company, setCompany] = useState(null);

    const [searchText, setSearchText] = useState("");
    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);

    /// summary
    /// Получить компанию по id
    /// summary
    const GetCompanyByIdAsync = async () => {
        try{
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId){
                        const response = await axios.get(`https://localhost:7299/api/company/${decodedToken.CompanyId}`, {
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
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /// summary
    /// Добавить купон
    /// summary
    const AddCouponAsync = async (e) => {
        e.preventDefault();
        try{
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId){
                        const response = await axios.post("https://localhost:7299/api/coupon", {
                            key: key,
                            productIds: selectedProducts,  
                            companyId: decodedToken.CompanyId,
                            startDate: selectedStartDate.toISOString(),
                            endDate: selectedEndDate.toISOString()
                        }, {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        });
                    
                        if(response && response.status === 200){
                            if(response.data && response.data.coupon){
                                setCouponList(list => [...list, response.data.coupon])
                            }
                        
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

    // Скорее всего надо делать fetch для получения части продуктов (первой страницы)
    /// <summary>
    /// Получить список продуктов по id компании
    /// </summary>
    const GetProductListByCompanyIdAsync = async () => {
        try{
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId)
                    {
                        const response = await axios.get(`https://localhost:7299/api/product/company/${decodedToken.CompanyId}`, {
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
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
                        await GetCompanyByIdAsync();
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


    useEffect(() => {
        GetCompanyByIdAsync();
        GetProductListByCompanyIdAsync();
    }, [])

    const handleSelect = (id) => {
        setSelectedProducts((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
      console.log(id);
    };

    const isChecked = (id) => selectedProducts.includes(id);

    const filteredProducts = productList.filter((product) => 
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div>           
                <div>
                    <h3>Создание купона</h3>
                </div>
                <div>
                    <form method="post" onSubmit={AddCouponAsync}>
                        <div>
                            <label>Ключ </label>
                            <input 
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="Введите ключ"
                            />
                        </div>
                        
                        <div>
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <p key={product}>{product}</p>
                                ))
                            ) : (
                                <></>    
                            )}
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" id="dropdown-multiselect">
                                {selectedProducts.length > 0
                                  ? `Выбрано: ${selectedProducts.length}`
                                  : "Выберите продукты"}
                              </Dropdown.Toggle>
                                
                              <Dropdown.Menu>
                                <div>
                                    <input
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        placeholder="Начните вводить:"
                                        />
                                </div>
                                {filteredProducts.map((product) => (
                                  <Dropdown.Item key={product.id} as="div">
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={isChecked(product.id)}
                                        onChange={() => handleSelect(product.id)}
                                      />
                                      {product.name}
                                    </label>
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            
                            </Dropdown>
                        </div>
                        
                        <div>
                        <label>Дата начала действия купона:</label>
                            <DatePicker
                                selected={selectedStartDate}
                                onChange={(date) => setSelectedStartDate(date)}
                                dateFormat="dd/MM/yyyy h:mm aa"
                                className="form-control"
                                placeholderText="Выберите дату"
                            />
                        </div>

                        <div>
                            <label>Дата окончания действия купона:</label>
                            <DatePicker
                                selected={selectedEndDate}
                                onChange={(date) => setSelectedEndDate(date)}
                                dateFormat="dd/MM/yyyy h:mm aa"
                                className="form-control"
                                placeholderText="Выберите дату"
                            />
                        </div>

                        <div>
                            <button type="submit">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CouponAddForm;
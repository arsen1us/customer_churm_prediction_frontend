import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { AuthContext } from "../../../AuthProvider"
import DateRangeDropdown from "../../DateRangeDropdown";

const CouponAddForm = () => {
    // Ключ для активации
    const[code, setCode] = useState("");
    // Процент скидки
    const[discountPercentage, setDiscountPercentage] = useState(0);
    // Дата окончания действия купона 
    const [expirationDate, setExpirationDate] = useState("day");
    const {user, token, handleRequestError} = useContext(AuthContext);

    /**
     * Создать купон
     * @param {*} e 
     */
    const AddCouponAsync = async (e) => {
        e.preventDefault();
        try{
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId){
                        const response = await axios.post("https://localhost:7299/api/coupon", {
                            code: code,
                            expirationDate: expirationDate,  
                            companyId: decodedToken.CompanyId,
                            discountPercentage: discountPercentage
                        }, {
                            headers: {
                                "Authorization": "Bearer " + token
                            }
                        });
                    
                        if(response && response.status === 200){
                            if(response.data && response.data.coupon){
                                alert("Купон успешно добавлен!")
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

    return (
        <div>
            <div>           
                <div>
                    <h3>Создание купона</h3>
                </div>
                <div>
                    <form method="post" onSubmit={AddCouponAsync}>
                        <div>
                            <label>Придумайте код купона </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Введите код"
                            />
                        </div>

                        <div>
                            <label>Процент скидки</label>
                            <input type="number"
                                   value={discountPercentage}
                                   onChange={(e) => setDiscountPercentage(e.target.value)}
                                   placeholder="Введите процент скидки"/>
                        </div>

                        <div>
                            <label>Время действия купона</label>
                            <div>
                                <DateRangeDropdown onSelectRange={setExpirationDate}/>
                            </div>
                        </div>
                        <div>

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
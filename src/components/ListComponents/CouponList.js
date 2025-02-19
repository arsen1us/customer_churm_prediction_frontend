import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"

const CouponList = () => {

    const {ownedCompany, token, handleRequestError} = useContext(AuthContext);
    const [couponList, setCouponList] = useState([]);

    /**
     * Получить список купонов
     */
    const getCoupons = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/coupon/company/${ownedCompany.id}`);
            if(response && response.status === 200){
                if(response.data && response.data.couponList){
                    setCouponList(response.data.couponList);
                }
            }
        }
        catch(error){
            await handleRequestError(error);
        }
    };

    /**
     * Получить список купонов при монтировании компонента
     */
    useEffect(() => {
        getCoupons();
    }, []);

    return (
        <div>
            {couponList.map((coupon, index) => {
                return (
                    <li key={index}>
                        <div>
                            <p>Код купона: {coupon.code}</p>
                        </div>
                    </li>
                );
            })}
        </div>
    );
}

export default CouponList;
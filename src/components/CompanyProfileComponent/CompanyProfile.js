import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"
import "./CompanyProfile.css"

import OwnerCompanyProfile from "./OwnerCompanyProfileComponent/OwnerCompanyProfile";
import BecomeSellerComponent from "./BecomeSellerComponent/BecomeSellerComponent";

const CompanyProfile = () => {
    const {companyId} = useParams();
    const {token, ownedCompany, handleRequestError, user} = useContext(AuthContext);
    const [company, setCompany] = useState(null)

    /**
     * Загрузить компанию по id пользователя (user.id)
     */
    const getCompany = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/user/${user.id}`,
            {
                headers: {
                    "Authorization": "Bearer "+ token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.company)
                    setCompany(response.data.company);
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;
                // Обработать только 404 ошибку
                switch (status){
                    case 404:
                        alert("Вы не являетесь продавцом (CompanyProfile.js)!")
                    break;

                    default:
                        await handleRequestError(error);
                        break;
                }
            }
            else{
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    

    return (
        <div>
            {ownedCompany ? (
                <OwnerCompanyProfile/>
                ):(
                <BecomeSellerComponent/>
            )}
        </div>
    );
}

export default CompanyProfile;
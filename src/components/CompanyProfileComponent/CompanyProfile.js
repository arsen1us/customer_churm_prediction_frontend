import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"
import "./CompanyProfile.css"

import OwnerCompanyProfile from "./OwnerCompanyProfileComponent/OwnerCompanyProfile";
import UserCompanyProfile from "./UserCompanyProfileComponent/UserCompanyProfile";
const CompanyProfile = () => {
    const {companyId} = useParams();
    const {token, ownedCompany, handleRequestError, user} = useContext(AuthContext);
    const [company, setCompany] = useState(null)

    /**
     * Загрузить компанию по id 
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
                        alert("Вы не ОБЛАДАЕТе компанией!")
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

    useEffect(() => {
        if(companyId && (!ownedCompany || ownedCompany?.id !== companyId)){
            getCompany();
        }
        else{
            setCompany(ownedCompany);
        }
    }, [companyId, ownedCompany]);

    const isOwner = ownedCompany && ownedCompany.id == companyId; 

    return (
        <div>
            {isOwner ? (
                <OwnerCompanyProfile/>
                ):(
                <UserCompanyProfile company={company}/>
            )}
        </div>
    );
}

export default CompanyProfile;
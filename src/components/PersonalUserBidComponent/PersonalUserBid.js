import "./PersonalUserBid.css"
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Компонент для управления персональными заказами
 */
const PersonalUserBid = () => {

    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);
    const [personalUsersBids, setPersonalUsersBids] = useState([]);

    /**
     * Получение всех пользовательских заявок
     */
    const getAllPersonalUsersBids = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/personal-order", {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });
            console.log(response)
            if(response.status && response.status === 200) {
               if(response.data && response.data.personalUsersBids) {
                    setPersonalUsersBids(response.data.personalUsersBids)
               }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    useEffect(() => {
        getAllPersonalUsersBids()
    }, [])

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Компонент для работы с заявками пользователей</h3>
            <h5 className="mb-4">Список заявок</h5>

            {personalUsersBids ? (
                <div className="row g-4">
                    {personalUsersBids.map((personalUserBid, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Заявка №{personalUserBid.id}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="mb-2"><strong>Имя:</strong> {personalUserBid.name}</p>
                                    <p className="mb-2"><strong>Телефон:</strong> {personalUserBid.phone}</p>
                                    <p className="mb-2"><strong>Почта:</strong> {personalUserBid.email}</p>
                                    <p className="mb-0"><strong>Детали заявки:</strong> {personalUserBid.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-danger mt-3">
                    Не удалось загрузить список personalUsersBids
                </div>
            )}
        </div>
    );
};

export default PersonalUserBid;
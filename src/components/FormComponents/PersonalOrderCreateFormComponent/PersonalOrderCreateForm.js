import React, {useState, useEffect, useContext} from "react";
import "./PersonalOrderCreateForm.css"
import { AuthContext } from "../../../AuthProvider";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonalOrderCreateForm = () => {

    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDelails] = useState("");

    const CreatePersonalOrder = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/personal-order", {
                name: name,
                phone: phone,
                email: email,
                details: details
            }, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });
            if(response.status && response.status === 200) {
               if(response.data && response.data.personalUserBid) {
                    alert("Заявка успешно создана. Ожидайте ответа. Мы свяжемся с вами в течении 2 дней")
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
                    <h1>Хотите заказать чай?</h1>
                </div>
                <div>
                    <p>Себе или в подарок? Либо у вас есть предложения по взаимовыгодному сотрудничеству? Заполните заявку и мы с вами свяжемся в ближайшее время.</p>
                </div>
                <div className="container mt-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Создание персональной заявки</h4>
                            <form onSubmit={CreatePersonalOrder}>
                                <div className="mb-3">
                                    <label className="form-label">Ваш e-mail</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ваш телефон</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ваше имя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Детали</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={details}
                                        onChange={(e) => setDelails(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Отправить
                                </button>
                                <p className="mt-3 small text-muted text-center">
                                    Нажимая кнопку <strong>"Отправить"</strong> вы соглашаетесь с{' '}
                                    <a href="#" className="text-decoration-underline">политикой обработки персональных данных</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalOrderCreateForm;
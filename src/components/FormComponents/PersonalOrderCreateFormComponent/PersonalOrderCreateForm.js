import React from "react";
import "./PersonalOrderCreateForm.css"

const PersonalOrderCreateForm = () => {
    return (
        <div>
            <div>
                <div>
                    <h1>Хотите заказать чай?</h1>
                </div>
                <div>
                    <p>Себе или в подарок? Либо у вас есть предложения по взаимовыгодному сотрудничеству? Заполните заявку и мы с вами свяжемся в ближайшее время.</p>
                </div>
                <div>
                    <form method="post">
                        <div>
                            <label>Ваш e-mail</label>
                            <input type="email"/>
                        </div>
                        <div>
                            <label>Ваш телефон</label>
                            <input type="tel"/>
                        </div>
                        <div>
                            <label>Ваше имя</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <button type="submit">Отправить</button>
                        </div>
                        <div>
                            <p>Нажимая кнопку "Отправить" вы соглашаетесь с <a src="#">политикой обработки персональных данных</a>.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalOrderCreateForm;
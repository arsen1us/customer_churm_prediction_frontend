import React from "react";
import { Link } from "react-router-dom";

/** Компонент с контактами */
const Contacts = () => {
    return(
        <div>
            {/* Центральная часть: информация */}
            <div className="col-md-4 mb-4">
                <h5 className="mb-3">Информация</h5>
                <div>Время работы: Пн-Вс 9:00 - 21:00</div>
                <div>Адрес: г. Самара, ул. Примерная, д. 1</div>
                <div>Почта: info@zhigulevskluk.ru</div>
                <div>Телефон: +7 (987) 654-32-10</div>
                <div>
                    <Link to="/confidentiality" className="text-decoration-none">
                    Политика обработки персональных данных
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
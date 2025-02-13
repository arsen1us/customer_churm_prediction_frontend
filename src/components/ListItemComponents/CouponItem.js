import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"


// Компонент для отображения элемента в списке продуктов
const CouponItem = ({coupon}) => {

    return (
        <div>
            <div>
                <Link to={`/coupon/${coupon.id}`}>
                    <p>Id - {coupon.id}</p>
                </Link>
            </div>
            <div>
                <p>Ключ - {coupon.key}</p>
            </div>
            <div>
                <p>Id компании - {coupon.companyId}</p>
            </div>
            <div>
                <p>Начало действия - {coupon.startDate}</p>
            </div>
            <div>
                <p>Окончание действия - {coupon.endDate}</p>
            </div>
            <div>
                <div>
                    <p>Список продуктов для купона</p>
                </div>
                <div>
                    {coupon.productIds.map((product) => (
                        <div key={product}>{product}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CouponItem;
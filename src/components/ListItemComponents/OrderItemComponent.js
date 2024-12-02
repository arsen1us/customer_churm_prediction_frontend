import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"


// Компонент для отображения элемента в списке продуктов
const OrderItemComponent = ({order}) => {

    return (
        <div className="product-card">
            <Link to={`/order/${order.id}`}>
                <h2>Id продукта - {order.productId}</h2>
                <p>Количество - {order.productCount}</p>
                <p>Id компании - {order.companyId}</p>
                <p>Итого -  ${order.totalPrice}</p>
            </Link>
        </div>
    );
}

export default OrderItemComponent;
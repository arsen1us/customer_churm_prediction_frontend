import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"



// Компонент для отображения элемента в списке продуктов
const OrderItemComponent = ({order}) => {

    return (
        <div className="product-card">
            <Link to={`/product/${order.product.id}`}>
                <div>
                    <h2>{order.product.name}</h2>
                </div>

                <div>
                    <p>Id продукта - {order.product.id}</p>
                </div>

                <div>
                    <p>Количество продукта - {order.order.productCount}</p>
                </div>

                <div>
                    <p>Общая сумма заказа - {order.order.totalPrice}</p>
                </div>

                <div>
                    <p>Id заказа - {order.order.id}</p>
                </div>

                <div>
                    <p>Id компании - {order.order.companyId}</p>
                </div>
            </Link>
        </div>
    );
}

export default OrderItemComponent;
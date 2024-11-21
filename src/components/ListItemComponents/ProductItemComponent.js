import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"


// Компонент для отображения элемента в списке продуктов
const ProductItemComponent = ({product}) => {

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <h2>{product.name}</h2>
                <p>{product.id}</p>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
            </Link>
        </div>
    );
}

export default ProductItemComponent;
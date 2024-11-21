import React, {useState, useEffect} from "react";
import axios from "axios";

// Компонент для отображения в списке продуктов
const ProductItemComponent = ({product}) => {

    return (
        <div className="product-card">
            <a href={`/products/${product.name}`} className="link">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
            </a>
        </div>
    );
}

export default ProductItemComponent;
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"


// Компонент для отображения элемента в списке продуктов
const ProductItemComponent = ({product}) => {

    return (
        <div 
            className="product-card"
            stype={{display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)', /* 5 колонок по умолчанию */
                    gap: '20px'}}>
            <Link to={`/product/${product.id}`}>
                <div>
                    <img  
                        src={`https://localhost:7299/uploads/${product.imageSrcs[0]}`}
                        alt={`Image {}`}
                        width="100px"
                    />
                </div>
                <div>
                    <h2>{product.name}</h2>
                </div>
                <div>
                    <p>{product.id}</p>
                </div>
                <div>
                    <p>{product.description}</p>
                </div>
                <div>
                    <p>Price: ${product.price}</p>
                </div>
            </Link>
        </div>
    );
}

export default ProductItemComponent;
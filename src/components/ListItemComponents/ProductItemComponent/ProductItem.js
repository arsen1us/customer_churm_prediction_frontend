import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"

import "./ProductItem.css"

// Компонент для отображения элемента в списке продуктов
const ProductItem = ({product}) => {

    return (
        <div>
            <div className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image">
                    <img
                      src={`https://localhost:7299/uploads/${product.imageSrcs[0]}`}
                      alt={product.name}
                    />
                    {product.isSale && <span className="sale-badge">Распродажа</span>}
                  </div>

                  <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-pricing">
                      <span className="current-price">{product.price} ₽</span>
                      {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} ₽</span>
                      )}
                      {product.discount && (
                        <span className="discount">-{product.discount}%</span>
                      )}
                    </div>
                    <div className="product-rating">
                      ⭐ {product.rating} <span>({product.reviewsCount} отзывов)</span>
                    </div>
                  </div>
                </Link>
            </div> 
        </div>
    );
}

export default ProductItem;
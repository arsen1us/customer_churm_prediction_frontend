import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom"


// Компонент для отображения элемента в списке продуктов
const CompanyItemComponent = ({company}) => {

    return (
        <div className="product-card">
            <div>
                <Link to={`/company/${company.id}`}>
                    <div>
                        <h2>Название: {company.name}</h2>
                    </div>
                    <div>
                        <p>История: {company.story}</p>
                    </div>
                    <div>
                        <p>Описание: {company.description}</p>
                    </div>
                    <div>
                        <p>Цена: ${company.price}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CompanyItemComponent;
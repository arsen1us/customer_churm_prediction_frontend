import React from "react";
import HandleCategoryComponent from "./HandleComponents/HandleCategoryComponent";
import CategoryListComponent from "./ListComponents/CategoryListComponent";

import HandleProductComponent from "./HandleComponents/HandleProductComponent";
import ProductListComponent from "./ListComponents/ProductListComponent";
const Home = () => {
    return (
        <div>
            <div>
                <h3>Главная страница</h3>
            </div>
            <div>
                <div>
                    <p>Список категорий</p>
                </div>
                <div>
                    <CategoryListComponent/>
                </div>
            </div>
            <div>
                <div>
                    <p>Управление категориями</p>
                </div>
                <div>
                    <HandleCategoryComponent/>
                </div>
            </div>
            <div>
                <div>
                    <p>Управление товарами</p>
                </div>
                <div>
                    <HandleProductComponent/>
                </div>
            </div>
            <div>
                <div>
                    <p>Список продуктов</p>
                </div>
                <div>
                    <ProductListComponent/>
                </div>
            </div>
        </div>
    );
};

export default Home;
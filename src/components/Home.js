import React from "react";
import HandleCategoryComponent from "./HandleComponents/HandleCategoryComponent";
import CategoryListComponent from "./ListComponents/CategoryListComponent";

import HandleProductComponent from "./HandleComponents/HandleProductComponent";
import ProductListComponent from "./ListComponents/ProductListComponent";
import PromotionComponent from "./PromotionComponent";

const Home = () => {
    return (
        <div>
            <div>
                <h3>Главная страница</h3>
                <PromotionComponent/>
            </div>
        </div>
    );
};

export default Home;
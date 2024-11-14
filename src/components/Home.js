import React from "react";
import HandleCategoryComponent from "./HandleComponents/HandleCategoryComponent";
import CategoryListComponent from "./CategoryListComponent";

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
        </div>
    );
};

export default Home;
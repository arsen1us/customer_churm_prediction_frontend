import React from "react";
import HandleCategoryComponent from "./HandleComponents/HandleCategoryComponent";
import CategoryListComponent from "./ListComponents/CategoryListComponent";

import HandleProductComponent from "./HandleComponents/HandleProductComponent";
import ProductListComponent from "./ListComponents/ProductListComponent";
import PromotionComponent from "./PromotionComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const Home = () => {

    const name = "";
    return (
        <div>
            <div>
                <h3>Главная страница</h3>
                
            </div>
            <div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#action1" value={name} onClick={console.log(123)}>Action 1</Dropdown.Item>
                    <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
                    <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <ProductListComponent/>
            </div>
        </div>
    );
};

export default Home;
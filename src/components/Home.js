import React, { useState, useEffect } from "react";
import HandleCategoryComponent from "./HandleComponents/HandleCategoryComponent";
import CategoryListComponent from "./ListComponents/CategoryListComponent";
import Select from "react-select/base";

import HandleProductComponent from "./HandleComponents/HandleProductComponent";
import ProductListComponent from "./ListComponents/ProductListComponent";
import PromotionComponent from "./PromotionComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Dropdown } from 'react-bootstrap';


const Home = () => {

  const options = [
    { value: 1, label: "Product 1" },
    { value: 2, label: "Product 2" },
    { value: 3, label: "Product 3" }, ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
      setSelectedOptions(selected);
    }

    const handleSubmit = () => {
      console.log("Selected items:", selectedOptions);
    }

    const handleMenuOpen = () => {

    }

    const handleInputChange = () => {

    }

    const handleMenuClose = () => {

    }
    return (
        <div>
            <div>
                <h3>Главная страница</h3>
            </div>
            <div>
              <div>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Выберите опцию
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Опция 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Опция 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Опция 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </div>
            <div>
                <ProductListComponent/>
            </div>
        </div>
    );
};

export default Home;
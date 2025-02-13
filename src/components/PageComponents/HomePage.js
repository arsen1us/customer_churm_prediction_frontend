import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../AuthProvider"

import CategoryManager from "../ManagerComponents/CategoryManagerComponent/CategoryManager";
import CategoryList from "../ListComponents/CategoryList";
import Select from "react-select/base";

import ProductManager from "../ManagerComponents/ProductManagerComponent/ProductManager";
import ProductList from "../ListComponents/ProductList";
import Promotion from "../PromotionComponent/Promotion";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
// import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const HomePage = () => {

  // Метод для обновления токена
  const {refreshToken} = useContext(AuthContext);
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
                <ProductList/>
            </div>
        </div>
    );
};

export default HomePage;
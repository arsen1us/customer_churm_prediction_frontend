import React, { useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const GetProductListAsync = async () => {
        try{
            const response = await axios.get("");

            if(response.status === 200)
            {
                if(response.data.products)
                    setProductList(response.data.products);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    } 

    useEffect(() => {
        GetProductListAsync();
    }, []);
    
    return (
        <div>

        </div>
    )
}
import React, { useState, useEffect } from 'react';
import axios from "axios"

const UpdateTokenComponent = () => {

    const HandleUpdate = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken != null || authToken != undefined || authToken != "")
                {
                    const token = authToken.replace("Bearer", "");
                    localStorage.removeItem("token");
                    localStorage.setItem("token", token);
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={HandleUpdate}>Handle Update</button>
        </div>
    )
}

export default UpdateTokenComponent;
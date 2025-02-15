import axios from "axios";
import { Link } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"

import React, {useContext} from "react";

const CustomLink = ({ url, userId, linkText }) => {

  const {refreshToken, handleRequestError} = useContext(AuthContext);

    /// <summary>
    /// Добавить действие Открыть страницу
    /// </summary>
    const handleLinkClick = async () => {
      try {
        if(url && userId && linkText){
            await axios.post("https://localhost:7299/api/user-action/open-page", {
                userId: userId,
                link: url,
                timestamp: new Date().toISOString(),
              });
        }
      } 
      catch (error){
        await handleRequestError(error);
    }
    };
  
    return (
      <Link to={url} onClick={handleLinkClick}>
        {linkText}
      </Link>
    );
  };
  
  export default CustomLink;
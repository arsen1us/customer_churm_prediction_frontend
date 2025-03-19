import React, {createContext, useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

export const useLogging = () => {

    const {refreshToken, handleRequestError} = useContext(AuthContext);

    /**
     * Логировать успешную операцию или информацию
     */
    const logInfo = async (message) => {
        try{
            const type = "info"; 
            const response = await axios.post(`https://localhost:7299/api/log`, {
                type: type,
                message: message
            });
            if(response && response.status === 200){

            }
        }
        catch(error){
            handleRequestError(error);
        }
    }

    /**
     * Логировать предупреждение
     */
    const logWarning = async (message) => {
        try{
            const type = "warn";
            const response = await axios.post(`https://localhost:7299/api/log`, {
                type: type,
                message: message
            });
            if(response && response.status === 200){
                
            }
        }
        catch(error){
            handleRequestError(error);
        }
    }

    /**
     * Логировать ошибку
     */
    const logError = async (message) => {
        try{
            const type = "error";
            const response = await axios.post(`https://localhost:7299/api/log`, {
                type: type,
                message: message
            });
            if(response && response.status === 200){
                
            }
        }
        catch(error){
            handleRequestError(error);
        }
    }

    return{
        logInfo,
        logWarning,
        logError
    };
}
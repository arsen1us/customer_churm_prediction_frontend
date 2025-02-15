import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthProvider";

const usePageTracking = () => {
    const location = useLocation();
    const {user} = useContext(AuthProvider);

    useEffect(() => {
        if(user) {
            alert(location.pathname);
        }
    }, [location, user])
}

export default usePageTracking;
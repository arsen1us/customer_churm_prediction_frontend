import axios from "axios";
import { useContext } from "react";
import { AuthContext  } from "../AuthProvider";

///<summary>
/// Хук, для отслеживания действий пользователя на сайте
///</summary>
const useTracking = () => {
    const {token, user, refreshToken, handleRequestError} = useContext(AuthContext);

    ///<summary>
    /// Добавить действие пользователя
    ///</summary>
    const trackUserAction = async (actionType, metadata) => {
        if(!user) return;

        console.log(user);

        try{
            const response = await axios.post(`https://localhost:7299/api/action`,
            {
                userId: user.id,
                actionType: actionType,
                metadata: metadata
            },
            {
            headers: {
                "Authorization": "Bearer "+ token
            }
            });

            if(response && response.status === 200){
                alert("Действие успешно создано")
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    return {trackUserAction};
}

export default useTracking;
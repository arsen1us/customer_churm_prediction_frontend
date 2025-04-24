import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider';

/**  
 * Компонент для оформления заказа
*/
const MakingOrder = () => {

    const {user, token, handleRequestError} = useContext(AuthContext);
    /** Получает id чая и количество из параметров запроса */
    const {id, count} = useParams();

    const [tea, setTea] = useState();
    /**
     * Загружает чай по id
     */
    const GetTeaByIdAsync = async () => {
        try{
            console.log(id);
            const response = await axios.get(`https://localhost:7299/api/tea/${id}`, {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.tea){
                    console.log(response.data.tea)
                    setTea(response.data.tea)
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /** Получает чай по id при инициализации компонента */
    useEffect(() => {
        if(id){
            GetTeaByIdAsync();
        }
    }, []);

    return(
        <div>
            {tea ? (
                <>
                    <div>
                        <h1>Страница оформления заказа</h1>

                        <h3>Список товаров</h3>
                        <div>
                            <img
                                src={`https://localhost:7299/uploads/${tea.imageSrcs[0]}`}
                                alt={tea.name}
                                className="card-img-top"
                                style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                            />
                            <p>{tea.name}</p>
                            <p>{count} шт</p>
                        </div>

                        <h1>Ваш заказ</h1>
                        <p>Название: {tea.name} ({count}) </p>
                        <p>Вес: {tea.weight} шт. Итого: {tea.weight * count} </p>
                        <p>Итого: {tea.price * count} руб</p>
                        <Link to>
                            <button>
                                Перейти к оплате
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1>Загрузка чая</h1>
                </>
            )}
        </div>
    );
};

export default MakingOrder;
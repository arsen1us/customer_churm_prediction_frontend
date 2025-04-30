import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider';

/**  
 * Компонент для оформления заказа
*/
const MakingOrder = () => {

    const {user, token, handleRequestError} = useContext(AuthContext);
    /** Получает id чая и количество из параметров запроса */
    // const {id, count} = useParams();

    const location = useLocation();
    const [tea, setTea] = useState();

    /** Получает список чая из state */
    const cartItems = location.state?.cartItems;

    /**
     * Загружает чай по id
     */
    // const GetTeaByIdAsync = async () => {
    //     try{
    //         const response = await axios.get(`https://localhost:7299/api/tea/${id}`, {
    //             headers: {
    //                 "Authorization": "Bearer" + token
    //             }
    //         });
    //         if(response && response.status === 200){
    //             if(response.data && response.data.tea){
    //                 console.log(response.data.tea)
    //                 setTea(response.data.tea)
    //             }
    //         }
    //     }
    //     catch (error){
    //         await handleRequestError(error);
    //     }
    // }

    /** Создаёт счёт на оплату */
    const CreateInvoiceAsync = async () => {
        const teas = cartItems.map(cartItem => ({
            teaId: cartItem.tea.id,
            count: cartItem.quantity,
            unitPrice: cartItem.tea.price
        }));
        
        try{
            const response = await axios.post(`https://localhost:7299/api/invoice`, {
                userId: user.id,
                teas: teas
            }, {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.invoice){
                    console.log(response.data.invoice)
                }
            }
        } catch (error){
            await handleRequestError(error);
        }
    }

    /** Получает чай по id при инициализации компонента */
    useEffect(() => {
        console.log("CartItems:")
        console.log(cartItems);
        // if(id){
        //     GetTeaByIdAsync();
        // }
    }, []);

    return(
        <div>
            {cartItems ? (
                <>
                    <div>
                        <h1>Страница оформления заказа</h1>

                        <div>
                            <h1>Информация о доставке</h1>
                            <p>Учивытвается вес и информация по упаковке (cartItem.tea.packageType, cartItem.tea.packageMaterials)</p>
                        </div>
                        
                        <h3>Список товаров</h3>
                        {cartItems.map((cartItem, index) => (
                            <div key={index}>
                                <div>
                                    <img
                                        src={`https://localhost:7299/uploads/${cartItem.tea.imageSrcs[0]}`}
                                        alt={cartItem.tea.name}
                                        className="card-img-top"
                                        style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                                    />
                                    <p>Название: {cartItem.tea.name}</p>
                                    {/* <p>{count} шт</p> */}
                                </div>
                            </div>
                            ))}

                        <h1>Ваш заказ</h1>
                        {cartItems.map((cartItem, index) => (
                            <div key={index}>
                                <p>Название: {cartItem.tea.name} ({cartItem.quantity} шт) </p>
                                <p>Вес: {cartItem.tea.weight} гр. ({cartItem.quantity} шт) Итого: {cartItem.tea.weight * cartItem.quantity} </p>
                            </div>
                        ))}

                        <p><strong>Вес итого: {cartItems.reduce((sum, cartItem) => sum + (cartItem.tea.weight * cartItem.quantity), 0)} гр.</strong></p>                        
                        <p><strong>Цена итого: {cartItems.reduce((sum, cartItem) => sum + (cartItem.tea.price * cartItem.quantity), 0)} руб.</strong></p>

                        <Link to="/payment">
                            <button onClick={CreateInvoiceAsync}>
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
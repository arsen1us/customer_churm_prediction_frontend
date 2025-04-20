import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider";

/**
 * Компонент с формой для созданий категорий чая
 */
const CategoryCreateForm = () => {

    const [name, setName] = useState()

    const {user, token, handleRequestError} = useContext(AuthContext);
    const createCategoryAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/category", {
                name: name
            }, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });
            if(response.status && response.status === 200) {
               if(response.data && response.data.category) {
                    alert("Категория успешно добавлена")
               }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    };

    return (
        <div>
            <div>
                <h>Форма для создания категорий</h>
            </div>
            <div>
                <form onSubmit={createCategoryAsync}>
                    <div>
                        <label>Название категории</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Создать категорию</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default CategoryCreateForm;
import React, {useState, useEffect} from "react";
import axios from "axios";

const HandleCompanyComponent = () => {

    // Переменные для создания компании
    const [name, setName] = useState("");
    const [story, setStory] = useState("");
    const [description, setDescription] = useState("");
    const [ownerIds, setOwnerIds] = useState([]);
    // Отобрахать поля для ввода id создателей компании
    const [ownerIdFields, setOwnerIdFields] = useState([""]);

    // Переменные для изменения компании
    const [updateName, setUpdateName] = useState("");
    const [updateStory, setUpdateStory] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateOwnerIds, setUpdateOwnerIds] = useState([]);

    const [currentCompanyIdEditing, setCurrentCompanyIdEditing] = useState("");
    const [isCompanyChanging, setIsCompanyChanging] = useState(false);

    const [companyList, setCompanyList] = useState([]);
    /// summary
    /// Обновить токен
    /// summary
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7777/api/token/update", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken)
                {
                    const token = authToken.replace("Bearer");
                    localStorage.setItem(token);
                }
            }
        }
        catch(error)
        {
            // Внутрянняя ошибка сервера (Internal server error)
            if(error.response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(error.response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
        }
    }

    /// summary
    /// Получить список компаний
    /// summary
    const GetCompanyListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/company", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status && response.status === 200){
                if(response.data && response.data.companyList){
                    setCompanyList(response.data.companyList);
                }
            }
        }
        catch (error) {
            if(error.response && error.response.status === 401){
                await UpdateToken();
                await GetCompanyListAsync();
            }

            else if(error.response && error.response.status === 500){
                console.log("Ошибка сервера", error);
            }

            else{
                console.log(error)
            }
        }
    }

    /// summary
    /// Добавить компанию
    /// summary
    const AddCompanyAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/company", {
                name: name,
                story: story,
                description: description,
                ownerIds: ownerIds
            }, {
                headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            });

            if(response.status && response.status === 200) {
                if(response.data && response.data.company) {
                    setCompanyList(list => [...list, response.data.company])
                }
            }
        }
        catch (error) {
            
            if(error.response && error.response.status === 401){
                await UpdateToken();
                await AddCompanyAsync();
            }

            else if(error.response && error.response.status === 500){
                console.log("Ошибка сервера", error);
            }

            else{
                console.log(error)
            }
        }
    }

    /// summary
    /// Обновить информацию о  компании 
    /// summary
    const UpdateCompanyAsync = async (companyId) => {
        try{
            const response = await axios.put(`https://localhost:7299/api/company/${companyId}`, {
                name: updateName,
                story: updateStory,
                description: updateDescription,
                ownerIds: updateOwnerIds
            }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            });

            if(response.status && response.status === 200)
            {
                if(response.data && response.data.company)
                    setCompanyList(list => [...list, response.data.company])
            }
        }
        catch (error) {
            if(error.response && error.response.status === 401){
                await UpdateToken();
                await UpdateCompanyAsync();
            }

            else if(error.response && error.response.status === 500){
                console.log("Ошибка сервера", error);
            }

            else{
                console.log(error)
            }
        }
    }

    /// summary
    /// Удалить компанию 
    /// summary
    const DeleteCompanyAsync = async (companyId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/company/${companyId}`, {
                name: updateName,
                story: updateStory,
                description: updateDescription,
                ownerIds: updateOwnerIds
            }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            });
            if(response.status && response.status === 200)
            {
                if(response.data.deletedCound && response.data.deletedCound > 0)
                    setCompanyList(list => list.filter(company => company.id !== companyId))
            }
        }
        catch (error) {
            if(error.response && error.response.status === 401){
                await UpdateToken();
                await DeleteCompanyAsync();
            }

            else if(error.response && error.response.status === 500){
                console.log("Ошибка сервера", error);
            }

            else{
                console.log(error)
            }
        }
    }

    useEffect(() => {
        GetCompanyListAsync();
    }, []);


    /// summary
    /// Отображение формы для изменения компании
    /// summary 
    const OpenEditPanel = (companyId) => {
        setIsCompanyChanging(!isCompanyChanging)
        setCurrentCompanyIdEditing(companyId)
    }
    /// summary
    /// Логика отображения полей для ввода владельцев компании
    /// summary   
    const handleInputChange = (index, value) => {
        const newOwnerIds = [...ownerIds];
        newOwnerIds[index] = value;
        setOwnerIds(newOwnerIds);
    };

    const handleAddOwner = () => {
        setOwnerIds([...ownerIds, ""]); // Добавляем новое пустое поле
    };

    const handleRemoveOwner = (index) => {
        const newOwnerIds = ownerIds.filter((_, i) => i !== index);
        setOwnerIds(newOwnerIds);
    };

    return (
        <div>
            <div>
                <h3>Страница для работы с компаниями</h3>
            </div>
            <div>
                <div>
                    <h3>Добавить компанию</h3>
                </div>
                <div>
                    <div>
                        <form method="post"> 
                            <div>
                                <label>Название </label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите название"
                                />
                            </div>
                            <div>
                                <label>История</label>
                                <input 
                                    type="text"
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                    placeholder="Введите историю"
                                />
                            </div>
                            <div>
                                <label>Описание</label>
                                <input 
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание"
                                />
                            </div>
                            <div>
                                {ownerIds.map((id, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={id}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            placeholder="Введите ID владельца"
                                        />
                                        <button onClick={() => handleRemoveOwner(index)}>Удалить</button>
                                    </div>
                                ))}
                                <button onClick={handleAddOwner}>Добавить владельца</button>
                                <div>
                                    <h3>Список владельцев:</h3>
                                    <ul>
                                        {ownerIds.map((id, index) => (
                                            <li key={index}>{id}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h4>
                                    Здесь должен быть компонент со списко пользователей и возможностью выбора пользователя
                                </h4>
                            </div>
                            <div>
                                <button type="submit" onClick={AddCompanyAsync}>
                                    Добавить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <h3>
                    Список Компаний (Добавить возможность поиска)
                </h3>
            </div>
            <div>
                <ul>
                    {companyList.map((company, index) => (
                        <li key={index}>
                            {!isCompanyChanging && currentCompanyIdEditing === company.id ? (
                            <>
                                <div>
                                    <form method="put" onSubmit={(async () => await UpdateCompanyAsync(company.id))}> 
                                        <div>
                                            <label>Название </label>
                                            <input 
                                                type="text"
                                                value={updateName}
                                                onChange={(e) => setUpdateName(e.target.value)}
                                                placeholder="Введите название"
                                            />
                                        </div>
                                        <div>
                                            <label>История</label>
                                            <input 
                                                type="text"
                                                value={updateStory}
                                                onChange={(e) => setUpdateStory(e.target.value)}
                                                placeholder="Введите историю"
                                            />
                                        </div>
                                        <div>
                                            <label>Описание</label>
                                            <input 
                                                type="text"
                                                value={updateDescription}
                                                onChange={(e) => setUpdateDescription(e.target.value)}
                                                placeholder="Введите описание"
                                            />
                                        </div>
                                        <div>
                                            <div>
                                                {ownerIds.map((id, index) => (
                                                    <div key={index}>
                                                        <input
                                                            type="text"
                                                            value={id}
                                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                                            placeholder="Введите ID владельца"
                                                        />
                                                        <button onClick={() => handleRemoveOwner(index)}>Удалить</button>
                                                    </div>
                                                ))}
                                                <button onClick={handleAddOwner}>Добавить владельца</button>
                                                <div>
                                                    <h3>Список владельцев:</h3>
                                                    <ul>
                                                        {ownerIds.map((id, index) => (
                                                            <li key={index}>{id}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h4>
                                                        Здесь должен быть компонент со списко пользователей и возможностью выбора пользователя
                                                    </h4>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit" onClick={AddCompanyAsync}>
                                                    Добавить
                                                </button>
                                            </div>
                                            <div>
                                                <button type="submit">Подтвердить</button>
                                                <button onClick={OpenEditPanel}>Отменить</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>
                            ) : (
                                <div>
                                    <p>{company.name}</p>
                                    <div>
                                        <div>
                                            <button onClick={(() => OpenEditPanel(company.id))}>
                                                Изменить
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={(async () => await DeleteCompanyAsync(company.id))}>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HandleCompanyComponent;
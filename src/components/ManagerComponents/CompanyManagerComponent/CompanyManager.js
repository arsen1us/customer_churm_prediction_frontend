import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../AuthProvider"

const CompanyManager = () => {

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
    // Метод для обновления токена
    const {token, refreshToken, handleRequestError} = useContext(AuthContext);

    /// summary
    /// Получить список компаний
    /// summary
    const GetCompanyListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/company", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response.status && response.status === 200){
                if(response.data && response.data.companyList){
                    setCompanyList(response.data.companyList);
                }
            }
        }
        catch (error) {
            await handleRequestError(error);
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
                "Authorization": "Bearer " + token
            }
            });

            if(response.status && response.status === 200) {
                if(response.data && response.data.company) {
                    setCompanyList(list => [...list, response.data.company])
                }
            }
        }
        catch (error) {
            await handleRequestError(error);
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
                "Authorization": "Bearer " + token
            }
            });

            if(response.status && response.status === 200)
            {
                if(response.data && response.data.company)
                    setCompanyList(list => [...list, response.data.company])
            }
        }
        catch (error) {
            await handleRequestError(error);
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
                "Authorization": "Bearer " + token
            }
            });
            if(response.status && response.status === 200)
            {
                if(response.data.deletedCound && response.data.deletedCound > 0)
                    setCompanyList(list => list.filter(company => company.id !== companyId))
            }
        }
        catch (error) {
            await handleRequestError(error);
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
                                <label>Описание</label>
                                <input 
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание"
                                />
                            </div>

                            <div>
                                <div>
                                    <p>Список владельцев:</p>
                                    <ul>
                                        {ownerIds.map((id, index) => (
                                            <li key={index}>{id}</li>
                                        ))}
                                    </ul>
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
                                </div>
                                <div>
                                    <button onClick={handleAddOwner}>Добавить владельца</button>
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
                                            </div>
                                            <div>
                                                <button onClick={handleAddOwner}>Добавить владельца</button>
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
                                    </form>
                                </div>
                            </>
                            ) : (
                                <div>
                                    <div>
                                        {`Отображение информации о компании`}
                                    </div>
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

export default CompanyManager;
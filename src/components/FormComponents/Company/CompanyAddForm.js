import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider"

const CompanyAddForm = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");
    const navigate = useNavigate();
    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);

    /**
     * Создать компанию
     * @param {*} e 
     */
    const AddCompanyAsync = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData()

            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append("name", companyName);
            formData.append("description", companyDescription);
            formData.append("userId", user.id)
            const response = await axios.post("https://localhost:7299/api/company", formData, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });
            if(response.status && response.status === 200) {
               if(response.data && response.data.company) {
                    navigate(`/company/${response.data.company.id}`)
               }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    const [selectedFiles, setSelectedFiles] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (
        <div>
            <div>
                <div>
                    <h3>Стать продавцом</h3>
                </div>
                <div>
                    <form method="post" onSubmit={AddCompanyAsync}>

                        <div>
                            <h2>Загрузить аватарку (для нескольких)</h2>
                            <input 
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange} 
                                required
                                />
                        </div>

                        <div>
                            <label>Введите название</label>
                            <input 
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label>Введите описание</label>
                            <input 
                                type="text"
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <button type="submit">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanyAddForm;
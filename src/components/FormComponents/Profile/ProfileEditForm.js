import React, {useEffect, useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider"

const ProfileEditForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(null);

    const {user, token, refreshToken, updateUser} = useContext(AuthContext);

    const UpdateUserInfoAsync = async (e) => {
        e.preventDefault();
        await updateUser(firstName, lastName, email, password, selectedFiles);
    }
  
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (
        <div>
            <div>
                {user ? (
                    <>
                        <form method="post" onSubmit={UpdateUserInfoAsync}>
                
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
                            <label>FirstName</label>
                            <input 
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={user.firstName}
                                required
                            />
                        </div>

                        <div>
                            <label>LastName</label>
                            <input 
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={user.lastName}
                                required
                            />    
                        </div>

                        <div>
                            <label>Email</label>
                            <input 
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={user.email}
                                required
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}    
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={user.password}
                                required
                            />
                        </div>

                        <div>
                            <button type="submit">Сохранить изменения</button>
                        </div>
                    </form>
                    </>
                ) : (
                    <>
                    Не удалось получить информацию о пользователе
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileEditForm;

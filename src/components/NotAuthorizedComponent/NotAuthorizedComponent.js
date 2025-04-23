import { Link } from "react-router-dom"

const NotAuthorizedComponent = () => {
    return (
        <div>
            <h1>Вы не авторизованы</h1>
            Необходимо <Link to="/auth">Войти</Link> или <Link to="/reg">Зарегистрироваться</Link>
        </div>
    )
}

export default NotAuthorizedComponent;
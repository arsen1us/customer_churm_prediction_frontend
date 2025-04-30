import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const NotAuthorizedComponent = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1>Вы не авторизованы</h1>
            <p>
                Необходимо <Link to="/auth">Войти</Link> или <Link to="/reg">Зарегистрироваться</Link>
            </p>
        </div>
    )
}

export default NotAuthorizedComponent;
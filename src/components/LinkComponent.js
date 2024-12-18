import axios from "axios";
import { Link } from "react-router-dom";

const LinkComponent = ({ url, userId, linkText }) => {
    /// <summary>
    /// Добавить действие Открыть страницу
    /// </summary>
    const handleLinkClick = async () => {
      try {
        await axios.post("https://localhost:7299/api/user-action", {
          userId: userId,
          link: url,
          timestamp: new Date().toISOString(),
        });
      } 
      catch (error){

        if(error.response){
            const status = error.response.status;

            switch(status) {
                case 401:
                    await UpdateToken();
                    break;
                case 403:
                    alert("У вас недостаточно прав для доступа к ресурсу!")
                    break;
                case 404:
                    alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                    break;
                case 500:
                    alert("Произошла ошибка сервера!")
                    break;
                default:
                    alert("Произошла непредвиденная ошибка. Попробуйте позже!")
            }
        }
        else {
            alert("Произошла ошибка во время получения списка отзывов. Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!" + error);
        }
    }
    };
  
    return (
      <Link to={url} onClick={handleLinkClick}>
        {linkText}
      </Link>
    );
  };
  
  export default LinkComponent;
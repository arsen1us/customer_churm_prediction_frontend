import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({imageSrcs}) => {

    /// <summary>
    /// Кнопка назад
    /// <summary>
    const PrevArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          style={{
            position: "absolute",
            left: "-35px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: "10",
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          {"<"}
        </button>
    );

    /// <summary>
    /// Кнопка вперёд
    /// <summary>
    const NextArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          style={{
            position: "absolute",
            right: "-35px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: "10",
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            color: "white",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          {">"}
        </button>
      );

    const settings = {
        dots: true, // Показ точек навигации
        infinite: true, // Бесконечная прокрутка
        speed: 500, // Скорость анимации
        slidesToShow: 1, // Сколько слайдов показывать одновременно
        slidesToScroll: 1, // Сколько слайдов прокручивать за раз
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Slider {...settings}>
            {imageSrcs.map((src, index) => (
              <div key={index}>
                <img
                  src={`https://localhost:7299/uploads/${src}`}
                  alt={`Image ${index}`}
                  style={{
                    width: "100%", // Изображение занимает всю ширину контейнера
                    height: "300px", // Фиксированная высота
                    objectFit: "cover", // Сохраняет пропорции
                    borderRadius: "10px", // Радиус углов
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
    );
}

export default ImageSlider;
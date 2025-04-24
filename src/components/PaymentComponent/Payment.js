import React, {useState, useEffect} from "react";


const Payment = () => {
    // Получаем сохраненные данные из localStorage или устанавливаем начальные значения
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('paymentFormData');
    return saved ? JSON.parse(saved) : {
      phone: '',
      cardNumber: '',
      recipientName: '',
      paymentConfirmed: false,
      timerEnd: null
    };
  });

  const [timeLeft, setTimeLeft] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Запускает таймер при подтверждении платежа
   */
  useEffect(() => {
    if (formData.paymentConfirmed && formData.timerEnd) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = formData.timerEnd - now;
        
        if (distance <= 0) {
          clearInterval(timer);
          setTimeLeft(0);
          // Здесь можно добавить логику по завершении таймера
        } else {
          setTimeLeft(Math.floor(distance / 1000));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [formData.paymentConfirmed, formData.timerEnd]);

  /**
   * Сохраняет данные в localStorage при изменении
   */
  useEffect(() => {
    localStorage.setItem('paymentFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** Подтверждает, что средства переведены */
  const handlePaymentConfirmation = () => {

    const timerEnd = new Date();
    timerEnd.setMinutes(timerEnd.getMinutes() + 10); // Таймер на 5 минут
    
    setFormData(prev => ({
      ...prev,
      paymentConfirmed: true,
      timerEnd: timerEnd.getTime()
    }));
    
    setIsProcessing(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>

      {!formData.paymentConfirmed ? (
        <div>
          <h1>Оформление заказа</h1>
            <h2>Данные для перевода</h2>
            <p>По номеру телефона: <strong>+7 (XXX) XXX-XX-XX</strong></p>
            <p>Или по номеру карты: <strong>XXXX XXXX XXXX XXXX</strong></p>
            <p>ФИО получателя: <strong>Иванов Иван Иванович</strong></p>
          
          <button onClick={handlePaymentConfirmation}>
            Средства переведены
          </button>
        </div>
      ) : (
        <div>
          <h3>Спасибо за заказ!</h3>
          <p>Ваш платеж получен и обрабатывается. </p>
          
          {timeLeft !== null && timeLeft > 0 && (
            <>
              <p>Ожидайте подтверждения администратора:</p>
              <div>
                {formatTime(timeLeft)}
              </div>
              <p>Пожалуйста, не закрывайте страницу.</p>
            </>
          )}
          
          {timeLeft === 0 && (
            <div>
                <p>Время ожидания истекло. Если ваш заказ еще не обработан, пожалуйста, свяжитесь с поддержкой.</p>
                <a href="#">
                    <button>Звязаться с поддержкой</button>
                </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Payment;
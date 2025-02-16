import React from "react";

const OrderList = ({ orders }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Мои заказы</h2>
      {orders.length === 0 ? (
        <p>Заказов пока нет.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg mb-4 shadow-md">
            <h3 className="text-lg font-semibold">Заказ #{order.id}</h3>
            <p className="text-sm text-gray-600">Статус: {order.orderStatus}</p>
            <p className="text-sm text-gray-600">Общая стоимость: {order.totalPrice} ₽</p>
            <div className="mt-2">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 border-b py-2">
                  <img width="200px" src={`https://localhost:7299/uploads/${item.productImageUrl}`} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.unitPrice} ₽ = {item.totalPrice} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
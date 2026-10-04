import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("sparkitUser");

    if (!savedUser) {
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (!user.id) {
        setLoading(false);
        return;
      }

      axios
        .get(
          `https://sparkit-e-commerce.onrender.com/api/orders/user/${user.id}`
        )
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch orders:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Failed to read user:", error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500">
            You haven't placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-800 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-medium text-gray-800">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-t pt-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg border"
                    />

                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-5 flex flex-col sm:flex-row sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Payment Method
                  </p>

                  <p className="font-medium text-gray-800">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="text-xl font-bold text-blue-600">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/order/adminOrders`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleSubmit = async (e, orderId, status) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/order/updateOrder`, {
                orderId,
                status,
            });
            if (response.data.success) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error updating order status", error);
        }
    };

    return (
        <div className="orders-container">
            <h2>All Orders</h2>
            <div className="orders-grid">
                {orders.length !== 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>Order ID: {order._id}</h3>
                                <p>{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="order-body">
                                <form onSubmit={(e) => handleSubmit(e, order._id, order.status)}>
                                    <select
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        value={order.status}
                                    >
                                        <option value="Food Processing">Food Processing</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <button type="submit">Update</button>
                                </form>
                                <p><strong>Total Amount:</strong> ₹{order.amount}</p>
                                <p><strong>Payment:</strong> {order.payment ? 'Paid' : 'Pending'}</p>
                                <div className="order-items">
                                    {order.items.map(item => (
                                        <div key={item._id} className="order-item">
                                            <img src={`/api/images/${item.image}`} alt={item.name} />
                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>₹{item.price}</p>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="order-footer">
                                <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>No orders found</h3>
                )}
            </div>
        </div>
    );
};

export default Order;

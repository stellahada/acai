import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './toten.scss';

const Totem = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        axios.get('http://localhost:5000/orders')
            .then(res => {
                const activeOrders = res.data.filter(order => order.status !== 'entregue');
                setOrders(activeOrders);
            })
            .catch(err => console.error("Erro ao buscar pedidos:", err));
    };

    const updateOrderStatus = (orderId, newStatus) => {
        axios.put(`http://localhost:5000/orders/${orderId}`, { status: newStatus })
            .then(() => fetchOrders())
            .catch(err => console.error("Erro ao atualizar status:", err));
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusImage = (orderStatus, currentStatus) => {
        const statusOrder = ['pedido confirmado', 'em preparo', 'saiu para a entrega'];
        if (statusOrder.indexOf(orderStatus) >= statusOrder.indexOf(currentStatus)) {
            return `${process.env.PUBLIC_URL}/assets/images/elipseConfirm.png`;
        } else {
            return `${process.env.PUBLIC_URL}/assets/images/elipseDefault.png`;
        }
    };

    const calculateTotal = (items) => {
        if (Array.isArray(items) && items.length > 0) {
            return items.reduce((total, item) => total + item.price, 0);
        }
        return 0;
    };

    const deliveryFee = 5.00;

    return (
        <div className="totem-container">
            <div className='nav'>
                    <img src='./assets/images/Button.png' alt='voltar'></img>
                <div className='text'>
                    <h3>Acompanhamento do Pedido</h3>
                    <div className='cart'>
                        <hr/>
                        <img src='./assets/images/shopping-cart.png'/>
                        <p> Meu pedido</p>

                    </div>
                </div>
                
            </div>
            
            {orders && orders.length > 0 ? (
                orders.map(order => {
                    const total = calculateTotal(order.items);
                    const finalTotal = total + deliveryFee;
                    return (
                        <div key={order.id} className="order">
                            <div className='orderDetails'>
                                <div className='cliente'>
                                    <h3>Pedido #{order.id}</h3>
                                    <hr/>
                                    <img src='./assets/images/Map-pin.png' alt='map-pin'/>
                                    <p>Rua Saí Gua-çu, 1</p>
                                </div>

                                <ul>
                                    {order.items && order.items.length > 0 ? (
                                        order.items.map((item, index) => (
                                            <div key={index}>
                                                <div className="item">
                                                    <img src={item.image} alt={item.name} />
                                                    <div className='namePrice'>
                                                        <p>{item.name}</p>
                                                        <span className='price'>R$ {item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <li>Sem itens neste pedido</li>
                                    )}
                                </ul>
                                <hr />
                                <div className='total'>
                                    <div className='totais'>
                                        <p>Subtotal </p>
                                        <p>Entrega: </p>
                                        <hr />
                                        <span>Valor total:  </span>
                                    </div>
                                    <div className='price'>
                                        <p>R$ {total.toFixed(2)}</p>
                                        <p>R$ {deliveryFee.toFixed(2)}</p>
                                        <p><span>R$ {finalTotal.toFixed(2)}</span></p>
                                    </div>
                                </div>
                                {order.status === 'pedido confirmado' && (
                                    <button onClick={() => updateOrderStatus(order.id, 'em preparo')}>Iniciar Preparo</button>
                                )}
                                {order.status === 'em preparo' && (
                                    <button onClick={() => updateOrderStatus(order.id, 'saiu para a entrega')}>Marcar como Entregue</button>
                                )}
                            </div>
                                <div className="status-container">
                                    <div className="status">
                                        <div className='image'>
                                            <img src={getStatusImage(order.status, 'pedido confirmado')} alt="Pedido confirmado" />
                                            <img className='line' src='./assets/images/linhaElipse.png'/>
                                        </div>
                                        <p>Pedido confirmado pelo restaurante</p>
                                    </div>
                                    <div className="status">
                                        <div className='image'>
                                            <img src={getStatusImage(order.status, 'em preparo')} alt="Em preparo" />
                                            <img className='line' src='./assets/images/linhaElipse.png'/>
                                        </div>
                                        <p>Em preparo</p>

                                    </div>
                                    <div className="status">
                                        <div className='image'>
                                        <img src={getStatusImage(order.status, 'saiu para a entrega')} alt="Saiu para a entrega" />
                                        </div>
                                        <p>Saiu para a entrega</p>
                                    </div>
                                </div>
                        </div>
                    );
                })
            ) : (
                <p>Sem pedidos ativos no momento.</p>
            )}
            
        </div>
    );
};

export default Totem;

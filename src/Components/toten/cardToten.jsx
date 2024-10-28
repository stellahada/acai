// src/components/ProductCard.js
import React from 'react';
import './cardToten.scss'; // Adicione estilos aqui se necessário

const ProductCard = ({ image, name, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h3 className="product-name">{name}</h3>
            <p className="product-price">R$ {price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;

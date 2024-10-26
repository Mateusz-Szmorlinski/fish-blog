import React from "react";
import "./Card.css";

function Card({ normalPrice, salePrice, benefits }) {
  // Function to calculate the percentage savings
  const calculateSavings = () => {
    if (!salePrice) return 0;
    return Math.round(((normalPrice - salePrice) / normalPrice) * 100);
  };

  const savings = calculateSavings();

  return (
    <div className="card">
      {/* Pricing Section */}
      <div className="price-section">
        {salePrice ? (
          <>
            <span className="normal-price crossed-out">${normalPrice}</span>
            <span className="sale-price">${salePrice}</span>
            <span className="savings">{savings}% off per month!</span>
          </>
        ) : (
          <span className="normal-price">${normalPrice}</span>
        )}
      </div>

      {/* Benefits Section */}
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index} className="benefit-item">
            <span>{benefit.text}</span>
            {benefit.included ? (
              <span className="included">&#10003;</span> // Checkmark
            ) : (
              <span className="not-included">&#10007;</span> // Cross
            )}
          </li>
        ))}
      </ul>

      {/* Buy Button */}
      <button className="buy-button">Buy Now</button>
    </div>
  );
}

export default Cart;

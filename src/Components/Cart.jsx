import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {Array.isArray(cart.items) &&
          cart.items.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Cart;

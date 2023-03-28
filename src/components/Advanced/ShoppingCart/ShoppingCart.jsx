import React, { useState } from 'react';
import { products } from './data';
import './style.css';

const ShoppingCart = () => {
  const [productArray, setProductArray] = useState(products);
  const [cartItems, setCartItems] = useState([]);

  // adding to cart
  const addToCart = (id) => {
    // checks whether the item is there or not
    let itemFound = [...cartItems].find((item) => item.id === id);
    if (itemFound) {
      // adds one item to the existing quantity of cart items
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      // adds a new cart item with quantity default as 1
      const newCartItem = {
        id: id,
        quantity: 1,
      };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
    }
  };
  // show cart items
  const getCartItemDetails = (id) => {
    return [...productArray].filter((item) => item.id === id)[0];
  };

  // delete cart items one by one... if the quantity hits 0 then automatically removes the entire item from the cart
  const deleteCartItem = (id, quantity) => {
    return setCartItems((prevItems) =>
      quantity === 1
        ? prevItems.filter((item) => item.id !== id)
        : prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
    );
  };

  return (
    <div className="shopping-container">
      ShoppingCart
      {/* Products */}
      <div className="products">
        {productArray.map((product, index) => {
          const { id, name, price } = product;
          return (
            <div className="product" key={id}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{name}</span>
                <span>${price}</span>
              </div>
              <div>
                <button onClick={() => addToCart(id)}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
      {/* cart items */}
      <h2>Cart</h2>
      <div className="cart">
        {cartItems?.map((item, index) => {
          const { id, quantity } = item;
          const prodData = getCartItemDetails(id);
          return (
            <div key={id}>
              {prodData.name}- QTY:{quantity}
              <div
                style={{ display: 'flex', flexDirection: 'column', width: 100 }}
              >
                <button onClick={() => addToCart(id)}>Add Item</button>
                <button onClick={() => deleteCartItem(id, quantity)}>
                  Delete Cart Item
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingCart;

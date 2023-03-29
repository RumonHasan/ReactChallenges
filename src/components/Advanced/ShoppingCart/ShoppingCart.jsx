import React, { useEffect, useState } from 'react';
import { products } from './data';
import './style.css';

const ShoppingCart = () => {
  const [productArray, setProductArray] = useState(products);
  const [cartItems, setCartItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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
    // gets the detail of the cart item from the product array after passing the id from the cart item
    return [...productArray].filter((item) => item.id === id)[0];
  };

  // delete cart items one by one... if the quantity hits 0 then automatically removes the entire item from the cart
  const deleteCartItem = (id, quantity) => {
    return setCartItems((prevItems) =>
      // if quantity is 1 then filter the items based on id and return the items without the id so deleting the item when the qty hits 0
      quantity === 1
        ? prevItems.filter((item) => item.id !== id)
        : // else map through the items and subtract 1 from the quantity of the items
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
    );
  };

  // search product based on name
  useEffect(() => {
    if (searchInput === '') {
      // if the search is empty then setting back to original products
      setProductArray(products);
    } else {
      // else filtering based on the product name
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setProductArray(filteredProducts);
    }
  }, [searchInput]);

  return (
    <div className="shopping-container">
      ShoppingCart:{' '}
      <input
        placeholder="Search Product"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
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

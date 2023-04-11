import React, { useEffect, useState, useCallback } from 'react';
import { products } from './data';
import './style.css';

const ShoppingCart = () => {
  return <React.Fragment></React.Fragment>;
};

// const ShoppingCart = () => {
//   const [productArray, setProductArray] = useState(products);
//   const [cartItems, setCartItems] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [totalCost, setTotalCost] = useState(0);
//   const [counter, setCounter] = useState(0);

//   // adding to cart
//   const addToCart = (id) => {
//     let itemFound = [...cartItems].find((item) => item.id === id);
//     if (itemFound) {
//       let updatedCart = cartItems.map((cartItem) =>
//         cartItem.id === id
//           ? {
//               ...cartItem,
//               quantity: cartItem.quantity + 1,
//             }
//           : cartItem
//       );
//       setCartItems(updatedCart);
//     } else {
//       setCartItems((prevCartItems) => [
//         ...prevCartItems,
//         {
//           id: id,
//           quantity: 1,
//         },
//       ]);
//     }
//   };

//   const increaseCounter = () => {
//     setCounter((prev) => prev + 1);
//   };

//   // show cart items
//   const getCartItemDetails = useCallback(
//     (id) => {
//       return [...productArray].filter((item) => item.id === id)[0];
//     },
//     [productArray]
//   );

//   // delete cart items one by one... if the quantity hits 0 then automatically removes the entire item from the cart
//   const deleteCartItem = (id, quantity) => {
//     return setCartItems((prevItems) =>
//       quantity === 1
//         ? prevItems.filter((item) => item.id !== id)
//         : prevItems.map((item) =>
//             item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//           )
//     );
//   };
//   // search product based on name
//   useEffect(() => {
//     if (searchInput === '') {
//       setProductArray(products);
//     } else {
//       const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().startsWith(searchInput.toLowerCase())
//       );
//       setProductArray(filteredProducts);
//     }
//   }, [searchInput]);

//   // update the total cost
//   useEffect(() => {
//     let localCost = 0;
//     cartItems?.map((cartItem) => {
//       const { quantity, id } = cartItem;
//       const { price } = getCartItemDetails(id);
//       return (localCost += quantity * price);
//     });
//     setTotalCost(localCost);
//   }, [cartItems, getCartItemDetails]);
//   console.log(totalCost);

//   return (
//     <div className="shopping-container">
//       ShoppingCart:{' '}
//       <input
//         placeholder="Search Product"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//       />
//       <button onClick={() => increaseCounter()}>{counter}: click me</button>
//       {/* Products */}
//       <div className="products">
//         {productArray.map((product, index) => {
//           const { id, name, price } = product;
//           return (
//             <div className="product" key={id}>
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <span>{name}</span>
//                 <span>${price}</span>
//               </div>
//               <div>
//                 <button onClick={() => addToCart(id)}>Add To Cart</button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       {/* cart items */}
//       <h2>Cart, Total Cost: {totalCost}</h2>
//       <div className="cart">
//         {cartItems?.map((item, index) => {
//           const { id, quantity } = item;
//           let prodData = getCartItemDetails(id);
//           return (
//             <div key={id}>
//               <h3>
//                 {prodData.name}- QTY:{item.quantity}
//               </h3>
//               <div
//                 style={{ display: 'flex', flexDirection: 'column', width: 100 }}
//               >
//                 <button onClick={() => addToCart(id)}>Add Item</button>
//                 <button onClick={() => deleteCartItem(id, quantity)}>
//                   Delete Cart Item
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default ShoppingCart;

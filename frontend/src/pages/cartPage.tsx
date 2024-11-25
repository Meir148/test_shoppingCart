import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { removeFromCart, fetchProducts, updateCartProduct } from '../slices/cartSlice';
import { io } from 'socket.io-client';
import { Product } from '../slices/cartSlice';
import axios from 'axios';

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartAndProduct.items);
//   const products = useAppSelector((state) => state.cartAndProduct.products);
  const loading = useAppSelector((state) => state.cartAndProduct.loading);
  const error = useAppSelector((state) => state.cartAndProduct.error);
  const dispatch = useAppDispatch();
  const [quantity, setqQantity] = useState(0)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

//   const handleRemove = (id: number) => {
//     dispatch(removeFromCart(id));
//   };

  const handleIncreaseQuantity = async (id: number) => {
    const product = cartItems.find(item => item.id === id);
    if (product) {
        setqQantity(quantity + 1)
      const updatedQuantity = product.stock - 1;
      await updateQuantityOnServer(id, updatedQuantity);
      dispatch(updateCartProduct({ id, quantity: updatedQuantity }));
    }
  };

  const handleDecreaseQuantity = async (id: number) => {
    const product = cartItems.find(item => item.id === id);
    if (product && product.stock > 1) {
        if(quantity > 0){
            setqQantity(quantity - 1)
        }
      const updatedQuantity = product.stock + 1;
      await updateQuantityOnServer(id, updatedQuantity);
      dispatch(updateCartProduct({ id, quantity: updatedQuantity }));
    }
  };

  const updateQuantityOnServer = async (id: number, quantity: number) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, { quantity });
    } catch (error) {
      console.error('Failed to update product quantity on server', error);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:5000/');

    socket.on('stockUpdate', (updatedProduct) => {
      console.log('Stock update received:', updatedProduct);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            // const product = products.find((prod: Product) => prod.id === item.id);
            return (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Stock: {item.stock ? item.stock : 'Loading...'}</p>
                {/* <button onClick={() => handleRemove(item.id)}>Remove</button> */}
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CartPage;

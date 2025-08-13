import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((items) => {
      const exists = items.find(item => item.id === product.id);
      if (exists) {
        return items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products onAdd={addToCart} />} />
          <Route path="/cart" element={<Cart items={cartItems} onRemove={removeFromCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ... */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}



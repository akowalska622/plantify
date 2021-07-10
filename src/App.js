import { useState } from 'react';

import './App.css';
import Header from './components/UI/Header';
import Plants from './components/Plants/Plants';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const handleOpenCart = () => {
    setIsCartShown(true);
  };

  const handleCloseCart = () => {
    setIsCartShown(false);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart onCartClose={handleCloseCart} />}
      <Header onCartOpen={handleOpenCart} />
      <main>
        <Plants />
      </main>
    </CartProvider>
  );
}

export default App;

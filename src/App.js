import { useState } from 'react';

import './App.css';
import Header from './components/UI/Headers';
import Plants from './components/Plants/Plants';
import Cart from './components/Cart/Cart';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const handleOpenCart = () => {
    setIsCartShown(true);
  };

  const handleCloseCart = () => {
    setIsCartShown(false);
  };

  return (
    <>
      {isCartShown && <Cart onCartClose={handleCloseCart} />}
      <Header onCartOpen={handleOpenCart} />
      <main>
        <Plants />
      </main>
    </>
  );
}

export default App;

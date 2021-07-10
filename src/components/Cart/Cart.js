import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const [reachedMax, setReachedMax] = useState(false);

  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const removeCartItem = id => {
    cartCtx.removeItem(id);
  };

  const addCartItem = item => {
    const itemIdx = cartCtx.items.findIndex(x => x.name === item.name);
    if (cartCtx.items[itemIdx].amount >= 5) {
      setReachedMax(true);
      return;
    }
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeCartItem.bind(null, item.id)}
          onAdd={addCartItem.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {reachedMax && <small>You can buy maximum 5 plants of each kind</small>}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCartClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Continue</button>}
      </div>
    </Modal>
  );
};

export default Cart;

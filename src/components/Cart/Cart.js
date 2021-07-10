import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [checkoutShown, setCheckoutShown] = useState(false);

  const showCheckout = () => setCheckoutShown(true);

  const handleCancel = () => {
    setCheckoutShown(false);
    props.onCartClose();
  };

  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const removeCartItem = id => {
    cartCtx.removeItem(id);
  };

  const addCartItem = item => {
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCartClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showCheckout}>
          Continue
        </button>
      )}
    </div>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {checkoutShown && <Checkout onCancel={handleCancel} />}
      {!checkoutShown && modalActions}
    </Modal>
  );
};

export default Cart;

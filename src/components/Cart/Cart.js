import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [checkoutShown, setCheckoutShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showCheckout = () => setCheckoutShown(true);

  const handleCancel = () => {
    setCheckoutShown(false);
  };

  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const removeCartItem = id => {
    cartCtx.removeItem(id);
  };

  const addCartItem = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrder = async userData => {
    setIsSubmitting(true);

    try {
      await fetch(
        'https://react-http-aac45-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (e) {
      console.log(e);
      setDidSubmit(false);
    }

    setIsSubmitting(false);
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

  const cartModalContent = (
    <React.Fragment>
      {!checkoutShown && (
        <React.Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
          </div>
          {modalActions}
        </React.Fragment>
      )}
      {checkoutShown && (
        <Checkout onCancel={handleCancel} onSubmitOrder={submitOrder} />
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data to the server...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order! Check your e-mail for order details.</p>
      <button onClick={props.onCartClose} className={classes.button}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

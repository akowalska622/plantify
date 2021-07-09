import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const CartButton = props => {
  return (
    <button className={classes.button} onClick={props.onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default CartButton;

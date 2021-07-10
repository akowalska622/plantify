import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = val => val.trim().length === 0;
const isFiveChars = val => val.trim().length === 5;

const Checkout = props => {
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const handleConfirm = e => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostal,
      street: enteredStreet,
    });
  };

  return (
    <>
      <h1>Delivery details</h1>
      <form className={classes.form} onSubmit={handleConfirm}>
        <div
          className={`${classes.control} ${
            formInputsValidity.name ? '' : classes.invalid
          }`}
        >
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputsValidity.name && (
            <p className={classes.error}>Please enter a valid name</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.street ? '' : classes.invalid
          }`}
        >
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
          {!formInputsValidity.street && (
            <p className={classes.error}>Please enter a valid street</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.postalCode ? '' : classes.invalid
          }`}
        >
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalInputRef} />
          {!formInputsValidity.postalCode && (
            <p className={classes.error}>
              Please enter a valid postal code (5 characters long)
            </p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.city ? '' : classes.invalid
          }`}
        >
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef} />
          {!formInputsValidity.city && (
            <p className={classes.error}>Please enter a valid city</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Back to cart
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  );
};

export default Checkout;

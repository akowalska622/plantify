import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <>
      <header className={classes.header}>
        <h1>Plantify</h1>
        <HeaderCartButton onCartOpen={props.onCartOpen} />
      </header>
      <div className={classes['main-image']}>
        <img
          src='https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
          alt='Jungle plants'
        />
      </div>
    </>
  );
};

export default Header;

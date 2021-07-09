import { useContext } from 'react';
import classes from './PlantItem.module.css';
import Card from '../UI/Card';
import PlantsItemForm from './PlantsItemForm';
import CartContext from '../../store/cart-context';

const PlantItem = props => {
  const cartCtx = useContext(CartContext);
  const addToCart = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <Card>
      <h3>{props.name}</h3>
      <hr />
      <img src={props.img} alt={props.name} className={classes.plantPic} />
      <p>${props.price.toFixed(2)}</p>
      <PlantsItemForm id={props.id} onAddToCart={addToCart} />
    </Card>
  );
};

export default PlantItem;

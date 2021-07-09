import classes from './PlantItem.module.css';
import Card from '../UI/Card';
import PlantsItemForm from './PlantsItemForm';

const PlantItem = props => {
  return (
    <Card>
      <h3>{props.name}</h3>
      <hr />
      <img src={props.img} alt={props.name} className={classes.plantPic} />
      <p>${props.price.toFixed(2)}</p>
      <PlantsItemForm id={props.id} />
    </Card>
  );
};

export default PlantItem;

import plantsDB from './plantsDB';
import classes from './AvailablePlants.module.css';
import PlantItem from './PlantItem';

const AvailablePlants = () => {
  const plantsList = plantsDB.map(plant => (
    <PlantItem
      key={plant.id}
      name={plant.name}
      price={plant.price}
      img={plant.img}
      id={plant.id}
    />
  ));

  return <section className={classes.container}>{plantsList}</section>;
};

export default AvailablePlants;

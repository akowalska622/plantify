import plantsDB from './plantsDB';
import classes from './AvailablePlants.module.css';

const AvailablePlants = () => {
  const plantsList = plantsDB.map(meal => <li>{meal.name}</li>);

  return (
    <section className={classes.container}>
      <ul>{plantsList}</ul>
    </section>
  );
};

export default AvailablePlants;

import { useState, useEffect } from 'react';
import classes from './AvailablePlants.module.css';
import PlantItem from './PlantItem';

const AvailablePlants = () => {
  const [plantsList, setPlantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlants = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        'https://react-http-aac45-default-rtdb.firebaseio.com/plants.json'
      );
      const plants = await res.json();

      const loadedPlants = [];
      for (const key in plants) {
        loadedPlants.push({
          id: key,
          name: plants[key].name,
          price: plants[key].price,
          img: plants[key].img,
        });
      }
      setPlantsList(loadedPlants);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const plantsDisplayed = plantsList.map(plant => (
    <PlantItem
      key={plant.id}
      name={plant.name}
      price={plant.price}
      img={plant.img}
      id={plant.id}
    />
  ));

  return (
    <section className={classes.container}>
      {!isLoading && plantsDisplayed}
      {isLoading && <p>Loading...</p>}
      {!isLoading && plantsDisplayed.length < 1 && <p>No plants found... 😔</p>}
    </section>
  );
};

export default AvailablePlants;

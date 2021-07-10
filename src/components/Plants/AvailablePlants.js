import { useState, useEffect } from 'react';
import classes from './AvailablePlants.module.css';
import PlantItem from './PlantItem';
import { SearchOutline } from 'react-ionicons';

const AvailablePlants = () => {
  const [plantsList, setPlantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterVal, setFilterVal] = useState('');

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

  const handleFilter = e => {
    setFilterVal(e.target.value);
  };

  const filteredPlants = plantsList.filter(item =>
    item.name.toLowerCase().includes(filterVal.toLowerCase())
  );

  const plantsDisplayed = filteredPlants.map(plant => (
    <PlantItem
      key={plant.id}
      name={plant.name}
      price={plant.price}
      img={plant.img}
      id={plant.id}
    />
  ));

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <SearchOutline color={'#24af60'} height='30px' width='30px' />{' '}
        <input
          onChange={handleFilter}
          className={classes.searchBar}
          placeholder='Search for a plant'
        />
      </div>
      <section className={classes.plantsContainer}>
        {!isLoading && plantsDisplayed}
        {isLoading && <p>Loading...</p>}
        {!isLoading && plantsDisplayed.length < 1 && (
          <p>No plants found... 😔</p>
        )}
      </section>
    </div>
  );
};

export default AvailablePlants;

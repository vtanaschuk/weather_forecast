import { useState, useEffect } from "react";
import { debounce } from "lodash"; // імпорт функції debounce з lodash

import CityItem from "./components/CityItem";
import Search from "./components/Search";
import ForecastList from "./components/ForecastList";
import WeatherToday from "./components/WeatherToday";
import Popup from "./components/Popup";

const initialState = [
  {
    id: 1,
    city: "Chernivtsi",
    from: "2024-03-6",
    till: "2024-03-10",
    picture: "./chernivtsi.jpg",
  },
];

function App() {
  const [allCities, setAllCities] = useState(initialState);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState(allCities[0]);

  useEffect(() => {
    setFilteredCities(allCities);
  }, [allCities]);

  const handleChangeCurrent = (id) => {
    const selectedCity = allCities.find((city) => city.id === id);
    setCurrentObj(selectedCity);
  };

  const handleSearch = debounce((searchTerm) => {
    const filtered = allCities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, 300);

  const handleAddItem = (item) => {
    setAllCities([...allCities, item]);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Popup
          isOpen={isOpen}
          onClose={handleCloseModal}
          cities={allCities}
          onAddItem={handleAddItem}
        />
      )}
      <div className="App">
        <div className="col-8">
          <div className="logo">
            <h1>
              <span>Weather</span> Forecast
            </h1>
          </div>
          <Search onSearch={handleSearch} />

          <div className="list">
            {filteredCities.map((el) => (
              <CityItem
                active={el.id === currentObj?.id}
                city={el}
                onChangeCurrent={handleChangeCurrent}
                key={el.id}
              />
            ))}
            <div className="city-item">
              <button onClick={() => setIsOpen(true)}>+ add trip</button>
            </div>
          </div>
          <ForecastList currentObj={currentObj} />
        </div>
        <div className="col-4">
          <WeatherToday
            currentCity={currentObj?.city}
            dateFrom={currentObj?.from}
          />
        </div>
      </div>
    </>
  );
}

export default App;

const CityItem = ({ city, onChangeCurrent, active }) => {
  return (
    <div
      className="city-item"
      style={active ? { border: "1px solid blue" } : {}}
      onClick={() => onChangeCurrent(city.id)}
    >
      <img src={city.picture} alt={city.city} />
      <div className="city-item-text">
        <div className="city-item-name">{city.city}</div>
        <div className="city-item-date">
          {city.from} - {city.till}
        </div>
      </div>
    </div>
  );
};

export default CityItem;

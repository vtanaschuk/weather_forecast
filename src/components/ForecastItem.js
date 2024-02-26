const ForecastItem = ({ obj }) => {
  const dayOfWeek = obj
    ? new Date(obj.datetime).toLocaleDateString("en-US", {
        weekday: "long",
      })
    : "";
  return (
    <div className="forecast-list-item">
      <div className="forecast-list-item-content">
        <div className="list-item-title">{dayOfWeek}</div>
        <div className="forecast-list-item-img">
          <img src={`./icons/${obj.icon}.svg`} alt={obj.icon} />
        </div>
        <div className="list-item-date">
          {obj.tempmin}&deg;/{obj.tempmax}&deg;
        </div>
      </div>
    </div>
  );
};

export default ForecastItem;

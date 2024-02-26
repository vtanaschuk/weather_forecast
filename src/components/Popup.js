import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useCitiesService from "../services/CitiesApiService";

const Popup = ({ onClose, onAddItem }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState(null);
  const [cities, setCities] = useState([]);
  const { getCities } = useCitiesService();

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, []);

  const onRequest = () => {
    getCities().then((city) => {
      setCities(city);
    });
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Setting tomorrow's date

  const next15Days = new Date(today);
  next15Days.setDate(today.getDate() + 15);

  const handleAddTrip = () => {
    if (!selectedCity || !startDate || !endDate) {
      setMessage("Please fill in all fields");
      return;
    }

    const startDateObj = new Date(startDate);
    if (startDateObj < today) {
      setMessage("Start date must be tomorrow or later");
      return;
    }

    const endDateObj = new Date(endDate);
    if (endDateObj < startDateObj) {
      setMessage("End date must be later than start date");
      return;
    }

    const selectedCityInfo = cities.find((city) => city.id === selectedCity);

    if (!selectedCityInfo) {
      setMessage("Invalid city selected");
      return;
    }

    const tripData = {
      id: uuidv4(),
      city: selectedCityInfo.city,
      from: startDate,
      till: endDate,
      picture: selectedCityInfo.picture,
    };

    onAddItem(tripData);
    setSelectedCity("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>Add New Trip</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <label htmlFor="city">Choose a city:</label>
        <select
          id="city"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city}
            </option>
          ))}
        </select>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          min={tomorrow.toISOString().split("T")[0]}
          max={next15Days.toISOString().split("T")[0]}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          min={startDate}
          max={next15Days.toISOString().split("T")[0]}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {message && <p className="red">* {message}</p>}
        <button onClick={handleAddTrip}>Add Trip</button>
      </div>
    </div>
  );
};

export default Popup;

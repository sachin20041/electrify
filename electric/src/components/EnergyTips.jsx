import React, { useEffect, useState } from 'react';
import './EnergyTips.css';

const EnergyTips = ({ usageData, weatherData }) => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    generateTips();
  }, [usageData, weatherData]);

  const generateTips = () => {
    const newTips = [];

    // Check if weatherData is defined
    if (weatherData) {
      // Weather-based tips
      if (weatherData.temperature > 30) {
        newTips.push('It’s hot outside! Consider using fans more often than AC to save energy.');
      } else if (weatherData.temperature < 20) {
        newTips.push('It’s cool! Take advantage of natural ventilation rather than heaters.');
      }
    }

    // Check if usageData is defined and not null
    if (usageData) {
      // Usage-based tips
      if (usageData.AC > 4) {
        newTips.push('You are using AC for more than 4 hours daily. Consider reducing its usage or increasing the thermostat temperature to save on your bill.');
      }

      if (usageData.WashingMachine > 2) {
        newTips.push('Running the washing machine more than twice a week? Try using it only for full loads to save energy.');
      }

      if (usageData.Fan < 2) {
        newTips.push('Fans are energy-efficient! Use them more often instead of AC.');
      }
    }

    setTips(newTips);
  };

  return (
    <div className="energy-tips-container">
      <h2>Personalized Energy-saving Tips</h2>
      <div className="tips-card">
        {tips.length > 0 ? (
          tips.map((tip, index) => (
            <div key={index} className="tip">
              <p>{tip}</p>
            </div>
          ))
        ) : (
          <p>No tips available. Continue conserving energy!</p>
        )}
      </div>

      <div className="weather-info">
        <h3>Current Weather</h3>
        {weatherData ? (
          <>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Condition: {weatherData.condition}</p>
          </>
        ) : (
          <p>Weather data not available.</p>
        )}
      </div>

      <div className="appliance-usage-info">
        <h3>Your Appliance Usage</h3>
        {usageData ? (
          <ul>
            {Object.entries(usageData).map(([appliance, hours], index) => (
              <li key={index}>
                {appliance}: {hours} hours/day
              </li>
            ))}
          </ul>
        ) : (
          <p>No usage data available.</p>
        )}
      </div>
    </div>
  );
};

export default EnergyTips;

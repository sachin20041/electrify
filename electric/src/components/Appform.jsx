import React, { useState } from 'react';
import './Applianceform.css';
import Navbar from './Navbar';

const Appform = () => {
  const [formData, setFormData] = useState({
    appliances: [],
    hours: {},
    desiredBill: '' 
  });

  const [calculatedBill, setCalculatedBill] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);

  const availableAppliances = [
    { name: 'Fan', rate: 1.5 }, 
    { name: 'Bulb', rate: 0.5 },
    { name: 'AC', rate: 7 },
    { name: 'Fridge', rate: 2 },
    { name: 'TV', rate: 1 },
    { name: 'Washing Machine', rate: 3 },
    { name: 'Microwave', rate: 4 },
    { name: 'Heater', rate: 5 }
  ];

  const handleApplianceChange = (e) => {
    const selectedAppliance = e.target.value;
    const selected = formData.appliances.includes(selectedAppliance);

    const updatedAppliances = selected
      ? formData.appliances.filter(appliance => appliance !== selectedAppliance)
      : [...formData.appliances, selectedAppliance];

    setFormData({
      ...formData,
      appliances: updatedAppliances
    });
  };

  const handleHoursChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      hours: {
        ...formData.hours,
        [name]: value
      }
    });
  };

  const handleBillChange = (e) => {
    setFormData({
      ...formData,
      desiredBill: e.target.value
    });
  };

  const calculateTotalBill = () => {
    return formData.appliances.reduce((acc, appliance) => {
      const applianceDetails = availableAppliances.find(a => a.name === appliance);
      const usageHours = formData.hours[appliance] ? parseInt(formData.hours[appliance]) : 0; 
      return acc + (applianceDetails ? applianceDetails.rate * usageHours * 30 : 0); 
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalBill = calculateTotalBill();
    setCalculatedBill(totalBill);
    setShowResults(true);
    provideSuggestions(totalBill);
  };

  const provideSuggestions = (totalBill) => {
    const desiredBill = parseFloat(formData.desiredBill);
    const remaining = desiredBill - totalBill;

    if (remaining > 0) {
      const possibleUsages = availableAppliances.map((appliance) => {
        const remainingHours = (remaining / (appliance.rate * 30)).toFixed(1);
        if (remainingHours > 0) {
          return `${appliance.name} for ${remainingHours} hours/day`;
        }
        return null;
      }).filter(Boolean);
      setRemainingBudget(remaining);
      setSuggestions(possibleUsages);
    } else {
      const excess = totalBill - desiredBill;
      let reductionNeeded = excess;
      const usageReductions = [];

      const sortedAppliances = formData.appliances
        .map(appliance => {
          const applianceDetails = availableAppliances.find(a => a.name === appliance);
          const usageHours = formData.hours[appliance] ? parseInt(formData.hours[appliance]) : 0;
          return {
            name: appliance,
            rate: applianceDetails.rate,
            usageHours,
            totalCost: applianceDetails.rate * usageHours * 30
          };
        })
        .sort((a, b) => b.totalCost - a.totalCost);

      for (const appliance of sortedAppliances) {
        if (reductionNeeded <= 0) break;

        const applianceReductionCostPerHour = appliance.rate * 30;
        const maxReducibleHours = Math.floor(appliance.usageHours);

        const hoursToReduce = Math.min(maxReducibleHours, Math.ceil(reductionNeeded / applianceReductionCostPerHour));
        const reductionCost = hoursToReduce * applianceReductionCostPerHour;

        if (hoursToReduce > 0) {
          usageReductions.push(`Reduce ${appliance.name} usage by ${hoursToReduce} hours/day to lower the bill.`);
          reductionNeeded -= reductionCost;
        }
      }

      setRemainingBudget(0);
      setSuggestions(usageReductions);
    }
  };

  return (
    <div className="appliance-form-container">
      <form className="appliance-form" onSubmit={handleSubmit}>
        <h2>Home Appliance Selection</h2>

        <div className="form-group">
          {availableAppliances.map(appliance => (
            <div className="checkbox-group" key={appliance.name}>
              <label htmlFor={appliance.name}>{appliance.name}</label>
              <input
                type="checkbox"
                id={appliance.name}
                value={appliance.name}
                onChange={handleApplianceChange}
                checked={formData.appliances.includes(appliance.name)}
              />
              <input
                type="number"
                min="0"
                name={appliance.name}
                onChange={handleHoursChange}
                placeholder="Hours/Day"
                style={{ marginLeft: '10px', width: '60px' }}
                disabled={!formData.appliances.includes(appliance.name)} 
              />
              <span style={{ marginLeft: '5px' }}>hours/day</span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Desired Monthly Bill (₹)</label>
          <input
            type="number"
            value={formData.desiredBill}
            onChange={handleBillChange}
            placeholder="Enter your target bill"
            required
          />
        </div>

        <button type="submit">Submit</button>

        {showResults && (
          <div className="results">
            <h3>Estimated Bill: ₹{calculatedBill.toFixed(2)}</h3>
            {remainingBudget > 0 && (
              <div className="suggestions-card">
                <h4>Suggestions:</h4>
                <p>You can use more appliances for the remaining ₹{remainingBudget.toFixed(2)}!</p>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            {remainingBudget <= 0 && suggestions.length > 0 && (
              <div className="suggestions-card">
                <h4>Reduction Suggestions:</h4>
                <p>Your estimated bill exceeds the desired bill. Consider reducing usage as follows:</p>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Appform;

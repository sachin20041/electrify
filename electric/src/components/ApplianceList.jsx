import React, { useState } from 'react';

// Sample data for appliances with wattage and emojis
const appliances = [
  { name: 'Fan', watt: 75, emoji: '🌀' },
  { name: 'Bulb (Incandescent)', watt: 60, emoji: '💡' },
  { name: 'Bulb (LED)', watt: 10, emoji: '🔋' },
  { name: 'Air Conditioner', watt: 2000, emoji: '❄️' },
  { name: 'Refrigerator', watt: 150, emoji: '🧊' },
  { name: 'Washing Machine', watt: 500, emoji: '🧼' },
  { name: 'Microwave', watt: 1000, emoji: '🍲' },
  { name: 'TV', watt: 150, emoji: '📺' },
  { name: 'Computer', watt: 100, emoji: '💻' },
  { name: 'Water Heater', watt: 3000, emoji: '♨️' },
  { name: 'Toaster', watt: 800, emoji: '🍞' },
  { name: 'Iron', watt: 1200, emoji: '🧴' },
  { name: 'Heater', watt: 1500, emoji: '🔥' },
  { name: 'Coffee Maker', watt: 900, emoji: '☕' }
];

// Alternative devices with lower wattage
const alternatives = {
  'Bulb (Incandescent)': [
    { name: 'Bulb (LED)', watt: 10 },
    { name: 'CFL Bulb', watt: 15 }
  ],
  'Air Conditioner': [
    { name: 'Fan', watt: 75 },
    { name: 'Evaporative Cooler', watt: 200 }
  ],
  'Water Heater': [
    { name: 'Solar Water Heater', watt: 100 },
    { name: 'Energy-efficient Water Heater', watt: 1000 }
  ]
};

// Cost per kWh in Rs
const costPerKwh = 7;

const ApplianceList = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedAlternative, setSelectedAlternative] = useState(null);

  // Calculate cost per hour
  const calculateCostPerHour = (watt) => (watt / 1000) * costPerKwh;

  // Handle appliance click
  const handleApplianceClick = (appliance) => {
    setSelectedAppliance(appliance);
    setSelectedAlternative(null); // Reset selected alternative
  };

  // Handle alternative selection
  const handleAlternativeChange = (event) => {
    const alternative = alternatives[selectedAppliance.name].find(
      (alt) => alt.name === event.target.value
    );
    setSelectedAlternative(alternative);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#3E4C6D', textAlign: 'center' }}>Appliance Wattage and Cost per Hour</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {appliances.map((appliance, index) => (
          <div
            key={index}
            onClick={() => handleApplianceClick(appliance)}
            style={{
              border: '2px solid #E8E8E8',
              borderRadius: '10px',
              padding: '20px',
              height: '150px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#F5FAFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#35477D',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s'
            }}
          >
            <span style={{ fontSize: '2em' }}>{appliance.emoji}</span>
            <p>{appliance.name}</p>
            <small>{appliance.watt} W</small>
          </div>
        ))}
      </div>

      {selectedAppliance && (
        <div style={{
          marginTop: '30px',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid #B2D4F2',
          backgroundColor: '#F5FAFF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '600px', // Increase card width
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h3 style={{ color: '#35477D' }}>{selectedAppliance.name}</h3>
          <p style={{ color: '#3E4C6D' }}>Wattage: {selectedAppliance.watt} W</p>
          <p style={{ color: '#3E4C6D' }}>
            Cost per Hour: Rs {calculateCostPerHour(selectedAppliance.watt).toFixed(2)}
          </p>

          {alternatives[selectedAppliance.name] ? (
            <>
              <label htmlFor="alternative-select" style={{ color: '#35477D', fontWeight: 'bold' }}>
                Select Alternative:
              </label>
              <select
                id="alternative-select"
                onChange={handleAlternativeChange}
                value={selectedAlternative?.name || ''}
                style={{
                  marginLeft: '10px',
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #B2D4F2',
                  backgroundColor: '#FFF'
                }}
              >
                <option value="">-- Choose an Alternative --</option>
                {alternatives[selectedAppliance.name].map((alt, index) => (
                  <option key={index} value={alt.name}>
                    {alt.name} ({alt.watt} W)
                  </option>
                ))}
              </select>

              {selectedAlternative && (
                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ color: '#35477D' }}>Selected Alternative</h4>
                  <p style={{ color: '#3E4C6D' }}>{selectedAlternative.name}</p>
                  <p style={{ color: '#3E4C6D' }}>Wattage: {selectedAlternative.watt} W</p>
                  <p style={{ color: '#3E4C6D' }}>
                    Cost per Hour: Rs {calculateCostPerHour(selectedAlternative.watt).toFixed(2)}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: '#3E4C6D' }}>No cheaper alternative available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplianceList;

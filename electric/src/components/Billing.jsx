import React, { useState } from 'react';

const slabRatesBelow500 = [
  { range: '1-100', limit: 100, rate: 0 },
  { range: '101-200', limit: 100, rate: 2.25 },
  { range: '201-400', limit: 200, rate: 4.50 },
  { range: '401-500', limit: 100, rate: 6.00 }
];

const slabRatesAbove500 = [
  { range: '1-100', limit: 100, rate: 0 },
  { range: '101-400', limit: 300, rate: 4.50 },
  { range: '401-500', limit: 100, rate: 6.00 },
  { range: '501-600', limit: 100, rate: 8.00 },
  { range: '601-800', limit: 200, rate: 9.00 },
  { range: '801-1000', limit: 200, rate: 10.00 },
  { range: 'Above 1000', limit: Infinity, rate: 11.00 }
];

const TamilNaduElectricityBilling = () => {
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [billAmount, setBillAmount] = useState(null);

  // Calculate the bill based on the slab rates
  const calculateBill = () => {
    let units = parseFloat(unitsConsumed);
    if (isNaN(units) || units < 0) {
      alert("Please enter a valid number of units.");
      return;
    }

    let totalBill = 0;
    let remainingUnits = units;

    const slabs = units <= 500 ? slabRatesBelow500 : slabRatesAbove500;

    for (const slab of slabs) {
      if (remainingUnits > 0) {
        const unitsInSlab = Math.min(remainingUnits, slab.limit);
        totalBill += unitsInSlab * slab.rate;
        remainingUnits -= unitsInSlab;
      }
    }

    setBillAmount(totalBill.toFixed(2));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ color: '#2F4F4F', textAlign: 'center' }}>Tamil Nadu Electricity Billing System</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="units" style={{ color: '#3E4C6D' }}>Enter units consumed (kWh): </label>
        <input
          type="number"
          id="units"
          value={unitsConsumed}
          onChange={(e) => setUnitsConsumed(e.target.value)}
          style={{
            padding: '8px',
            width: '100%',
            marginTop: '8px',
            borderRadius: '5px',
            border: '1px solid #B2D4F2',
            backgroundColor: '#F0F8FF'
          }}
        />
      </div>

      <button
        onClick={calculateBill}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#4CAF50',
          color: '#FFF',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Calculate Bill
      </button>

      {billAmount !== null && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#E8F8F5',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#3E4C6D' }}>Total Bill Amount</h3>
          <p style={{ fontSize: '1.5em', color: '#2F4F4F' }}>Rs {billAmount}</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: '#3E4C6D', textAlign: 'center' }}>Billing Slabs</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#B2D4F2', color: '#3E4C6D' }}>
              <th style={{ padding: '10px', border: '1px solid #E8E8E8' }}>Unit Range (kWh)</th>
              <th style={{ padding: '10px', border: '1px solid #E8E8E8' }}>Rate (Rs per kWh)</th>
            </tr>
          </thead>
          <tbody>
            {(unitsConsumed <= 500 ? slabRatesBelow500 : slabRatesAbove500).map((slab, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F5FAFF' : '#FFF' }}>
                <td style={{ padding: '10px', border: '1px solid #E8E8E8', textAlign: 'center' }}>
                  {slab.range}
                </td>
                <td style={{ padding: '10px', border: '1px solid #E8E8E8', textAlign: 'center' }}>
                  Rs {slab.rate.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TamilNaduElectricityBilling;

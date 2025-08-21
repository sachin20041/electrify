import React, { useState } from "react";

// Appliance logos (using emoji for demonstration, replace with image URLs if needed)
const applianceLogos = {
  Fan: "🌀",
  "Light Bulb": "💡",
  "Air Conditioner": "❄",
  Refrigerator: "🧊",
  Television: "📺",
  WashingMachine: "🧺",
  Microwave: "🍲",
  Computer: "💻",
  Heater: "🔥",
  Toaster: "🍞",
};

const BoxApp = () => {
  const initialAppliances = [
    { id: 1, name: "Fan", watts: 75 },
    { id: 2, name: "Light Bulb", watts: 60 },
    { id: 3, name: "Air Conditioner", watts: 2000 },
    { id: 4, name: "Refrigerator", watts: 150 },
    { id: 5, name: "Television", watts: 100 },
    { id: 6, name: "Washing Machine", watts: 500 },
    { id: 7, name: "Microwave", watts: 1200 },
    { id: 8, name: "Computer", watts: 200 },
    { id: 9, name: "Heater", watts: 1500 },
    { id: 10, name: "Toaster", watts: 800 },
  ];

  const [appliances, setAppliances] = useState(initialAppliances);
  const [totalWatts, setTotalWatts] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [newAppliance, setNewAppliance] = useState({ name: "", watts: "" });
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Function to handle appliance selection
  const handleApplianceSelect = (appliance) => {
    setSelectedAppliance(appliance);
  };

  // Function to calculate energy usage
  const calculateUsage = () => {
    if (selectedAppliance) {
      const totalTimeInHours = parseFloat(hours) + parseFloat(minutes) / 60;
      const wattsUsed = selectedAppliance.watts * totalTimeInHours;
      const newTotalWatts = totalWatts + wattsUsed;
      setTotalWatts(newTotalWatts);
      calculateUnitsAndCharges(newTotalWatts);
      setHours(0);
      setMinutes(0);
      setSelectedAppliance(null);
    }
  };

  // Function to calculate units and charges based on total watts
  const calculateUnitsAndCharges = (watts) => {
    const units = Math.floor(watts / 100);
    setTotalUnits(units);

    let charges = 0;
    if (units > 100) {
      charges += 450;
    }

    if (units <= 100) {
      charges += 0;
    } else if (units <= 200) {
      charges += (units - 100) * 2.25;
    } else if (units <= 400) {
      charges += 100 * 2.25;
      charges += (units - 200) * 4.50;
    } else if (units <= 500) {
      charges += 100 * 2.25;
      charges += 200 * 4.50;
      charges += (units - 400) * 6.00;
    } else if (units <= 600) {
      charges += 100 * 2.25;
      charges += 200 * 4.50;
      charges += 100 * 6.00;
      charges += (units - 500) * 8.00;
    } else if (units <= 800) {
      charges += 100 * 2.25;
      charges += 200 * 4.50;
      charges += 100 * 6.00;
      charges += 100 * 8.00;
      charges += (units - 600) * 9.00;
    } else if (units <= 1000) {
      charges += 100 * 2.25;
      charges += 200 * 4.50;
      charges += 100 * 6.00;
      charges += 100 * 8.00;
      charges += 200 * 9.00;
      charges += (units - 800) * 10.00;
    } else {
      charges += 100 * 2.25;
      charges += 200 * 4.50;
      charges += 100 * 6.00;
      charges += 100 * 8.00;
      charges += 200 * 9.00;
      charges += 200 * 10.00;
      charges += (units - 1000) * 11.00;
    }

    setTotalCharges(charges);
  };

  // Add a new appliance
  const addAppliance = () => {
    if (newAppliance.name && newAppliance.watts) {
      const appliance = {
        id: appliances.length + 1,
        name: newAppliance.name,
        watts: parseFloat(newAppliance.watts),
      };
      setAppliances([...appliances, appliance]);
      setNewAppliance({ name: "", watts: "" });
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", backgroundColor: "#000", color: "#00FFFF", minHeight: "100vh" }}>
      {/* Left Side: Appliances */}
      <div style={{ width: "45%", padding: "20px", borderRight: "2px solid #00FFFF" }}>
        <h2 style={{ marginBottom: "20px" }}>Appliances</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {appliances.map((appliance) => (
            <div
              key={appliance.id}
              onClick={() => handleApplianceSelect(appliance)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #00FFFF",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#222",
                color: "#00FFFF",
                cursor: "pointer",
                width: "60px",
                height: "60px",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {applianceLogos[appliance.name] || "⚙"}
              </span>
              <span style={{ fontSize: "12px" }}>{appliance.name}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "30px" }}>
          <h4>Add a new appliance:</h4>
          <input
            type="text"
            placeholder="Appliance Name"
            value={newAppliance.name}
            onChange={(e) => setNewAppliance({ ...newAppliance, name: e.target.value })}
            style={{
              padding: "5px",
              marginBottom: "10px",
              width: "90%",
              backgroundColor: "#333",
              color: "#00FFFF",
              border: "2px solid #00FFFF",
            }}
          />
          <input
            type="number"
            placeholder="Watts"
            value={newAppliance.watts}
            onChange={(e) => setNewAppliance({ ...newAppliance, watts: e.target.value })}
            style={{
              padding: "5px",
              width: "90%",
              backgroundColor: "#333",
              color: "#00FFFF",
              border: "2px solid #00FFFF",
            }}
          />
          <button
            onClick={addAppliance}
            style={{
              marginTop: "10px",
              padding: "8px",
              backgroundColor: "#00FFFF",
              color: "#000",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Appliance
          </button>
        </div>
      </div>

      {/* Right Side: Summary and Input */}
      <div style={{ width: "55%", padding: "20px" }}>
        <h2>Energy Usage Summary</h2>
        <div style={{ fontSize: "18px", marginTop: "20px" }}>
          <p>
            <strong>Total Watts:</strong> {totalWatts.toFixed(2)} W
          </p>
          <p>
            <strong>Total Units:</strong> {totalUnits} units
          </p>
          <p>
            <strong>Total Charges:</strong> ₹{totalCharges.toFixed(2)}
          </p>
        </div>

        {selectedAppliance && (
          <div style={{ marginTop: "20px" }}>
            <h3>Calculate Usage for {selectedAppliance.name}</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label>Hours:</label>
                <select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  style={{
                    padding: "5px",
                    marginLeft: "10px",
                    backgroundColor: "#333",
                    color: "#00FFFF",
                    border: "2px solid #00FFFF",
                  }}
                >
                  {[...Array(24).keys()].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Minutes:</label>
                <select
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  style={{
                    padding: "5px",
                    marginLeft: "10px",
                    backgroundColor: "#333",
                    color: "#00FFFF",
                    border: "2px solid #00FFFF",
                  }}
                >
                  {[...Array(60).keys()].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={calculateUsage}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  backgroundColor: "#00FFFF",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Calculate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxApp;
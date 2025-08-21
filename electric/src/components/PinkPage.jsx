import React, { useState } from "react";

const PinkPage = () => {
  const [checkedItems, setCheckedItems] = useState(Array(6).fill(false));
  const [checkedKitchenItems, setCheckedKitchenItems] = useState(Array(10).fill(false));
  const [checkedLaundryItems, setCheckedLaundryItems] = useState(Array(10).fill(false));
  const [checkedCleaningItems, setCheckedCleaningItems] = useState(Array(10).fill(false));
  const [checkedHeatingItems, setCheckedHeatingItems] = useState(Array(10).fill(false));
  const [checkedLightingItems, setCheckedLightingItems] = useState(Array(10).fill(false));
  const [checkedEntertainmentItems, setCheckedEntertainmentItems] = useState(Array(10).fill(false));
  
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [showSelected, setShowSelected] = useState(false); // State to control visibility of selected appliances

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleKitchenCheckboxChange = (index) => {
    const newCheckedKitchenItems = [...checkedKitchenItems];
    newCheckedKitchenItems[index] = !newCheckedKitchenItems[index];
    setCheckedKitchenItems(newCheckedKitchenItems);
  };

  const handleLaundryCheckboxChange = (index) => {
    const newCheckedLaundryItems = [...checkedLaundryItems];
    newCheckedLaundryItems[index] = !newCheckedLaundryItems[index];
    setCheckedLaundryItems(newCheckedLaundryItems);
  };

  const handleCleaningCheckboxChange = (index) => {
    const newCheckedCleaningItems = [...checkedCleaningItems];
    newCheckedCleaningItems[index] = !newCheckedCleaningItems[index];
    setCheckedCleaningItems(newCheckedCleaningItems);
  };

  const handleHeatingCheckboxChange = (index) => {
    const newCheckedHeatingItems = [...checkedHeatingItems];
    newCheckedHeatingItems[index] = !newCheckedHeatingItems[index];
    setCheckedHeatingItems(newCheckedHeatingItems);
  };

  const handleLightingCheckboxChange = (index) => {
    const newCheckedLightingItems = [...checkedLightingItems];
    newCheckedLightingItems[index] = !newCheckedLightingItems[index];
    setCheckedLightingItems(newCheckedLightingItems);
  };

  const handleEntertainmentCheckboxChange = (index) => {
    const newCheckedEntertainmentItems = [...checkedEntertainmentItems];
    newCheckedEntertainmentItems[index] = !newCheckedEntertainmentItems[index];
    setCheckedEntertainmentItems(newCheckedEntertainmentItems);
  };

  const handleSubmit = () => {
    let updatedSelectedAppliances = [];
    
    // Kitchen Appliances
    if (checkedItems[0]) {
      const selectedKitchenItems = kitchenAppliances.filter((_, index) => checkedKitchenItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedKitchenItems];
    }

    // Laundry Appliances
    if (checkedItems[1]) {
      const selectedLaundryItems = laundryAppliances.filter((_, index) => checkedLaundryItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedLaundryItems];
    }

    // Cleaning Appliances
    if (checkedItems[2]) {
      const selectedCleaningItems = cleaningAppliances.filter((_, index) => checkedCleaningItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedCleaningItems];
    }

    // Heating and Cooling Appliances
    if (checkedItems[3]) {
      const selectedHeatingItems = heatingAppliances.filter((_, index) => checkedHeatingItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedHeatingItems];
    }

    // Lighting and Power Appliances
    if (checkedItems[4]) {
      const selectedLightingItems = lightingAppliances.filter((_, index) => checkedLightingItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedLightingItems];
    }

    // Entertainment & Electronics
    if (checkedItems[5]) {
      const selectedEntertainmentItems = entertainmentAppliances.filter((_, index) => checkedEntertainmentItems[index]);
      updatedSelectedAppliances = [...updatedSelectedAppliances, ...selectedEntertainmentItems];
    }

    // If no items selected, show a message
    if (updatedSelectedAppliances.length === 0) {
      updatedSelectedAppliances.push("No Appliances selected.");
    }

    // Update state and show selected appliances
    setSelectedAppliances(updatedSelectedAppliances);
    setShowSelected(true);
  };

  const styles = {
    
    pageContainer: {
      minHeight: "100vh",
      backgroundColor: "#000000",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      overflowY: "auto",
      paddingBottom: "20px",
    },
    rectangle: {
      width: "90%", // Rectangle width
      height: "auto",
      backgroundColor: "black",
      border: "2px solid black",
      margin: "20px auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "10px",
    },
    item: {
      width: "30%",
      backgroundColor: "black",
      color:"black",
      border: "1px solid #ccc",
      margin: "5px 0",
      padding: "10px",
      textAlign: "center",
    },
    applianceItem: {
      width: "24%",
      backgroundColor: "black",
      border: "1px solid #ccc",
      margin: "5px 0",
      padding: "10px",
      textAlign: "center",
    },
    cardContainer: {
      width: "90%", // Width matches the rectangle width
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      width: "90%", // Width matches the rectangle width
      height: "200px", // Fixed height of 200px
      backgroundColor: "black",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      margin: "10px 0",
      padding: "10px",
      textAlign: "center",
    },
  };

  const applianceCategories = [
    "Kitchen Appliances",
    "Laundry Appliances",
    "Cleaning Appliances",
    "Heating and Cooling Appliances",
    "Lighting and Power Appliances",
    "Entertainment & Electronics",
  ];

  const kitchenAppliances = [
    "Refrigerator",
    "Oven",
    "Microwave",
    "Dishwasher",
    "Toaster",
    "Coffee Maker",
    "Blender",
    "Food Processor",
    "Electric Kettle",
    "Slow Cooker",
  ];

  const laundryAppliances = [
    "Washing Machine",
    "Dryer",
    "Iron",
    "Ironing Board",
    "Clothes Steamer",
    "Laundry Basket",
    "Drying Rack",
    "Clothes Hanger",
    "Lint Roller",
    "Fabric Shaver",
  ];

  const cleaningAppliances = [
    "Vacuum Cleaner",
    "Mop",
    "Broom",
    "Dustpan",
    "Duster",
    "Window Cleaner",
    "Carpet Cleaner",
    "Steam Cleaner",
    "Floor Scrubber",
    "Pressure Washer",
  ];

  const heatingAppliances = [
    "Space Heater",
    "Electric Blanket",
    "Radiator",
    "Fan Heater",
    "Oil Heater",
    "Heated Towel Rack",
    "Wood Stove",
    "Pellet Stove",
    "Fireplace Insert",
    "Central Heating System",
  ];

  const lightingAppliances = [
    "LED Bulb",
    "Floor Lamp",
    "Table Lamp",
    "Chandelier",
    "Wall Sconce",
    "Spotlight",
    "Outdoor Light",
    "Smart Bulb",
    "String Lights",
    "Track Lighting",
  ];

  const entertainmentAppliances = [
    "Television",
    "Sound System",
    "Streaming Device",
    "Game Console",
    "Blu-ray Player",
    "Projector",
    "Home Theater System",
    "Smart Speaker",
    "Digital Media Player",
    "VR Headset",
  ];
  const applianceGuidance = {
    "Refrigerator": {
      guidance: "Keep it set between 35°F and 38°F for optimal energy efficiency.",
      power: 150, // Power in watts
    },
    "Oven": {
      guidance: "Use the oven light instead of opening the door to check your food.",
      power: 2000,
    },
    "Microwave": {
      guidance: "Cover food to retain moisture and heat more efficiently.",
      power: 1200,
    },
    "Air Conditioner": {
      guidance: "Set your AC to 24°C or higher for better energy efficiency.",
      power: 1500,
    },
    "Dishwasher": {
      guidance: "Use the dishwasher only when fully loaded, and air dry dishes when possible.",
      power: 1800,
    },
    "Washing Machine": {
      guidance: "Wash clothes in cold water whenever possible and use high-efficiency settings.",
      power: 500,
    },
    "Clothes Dryer": {
      guidance: "Dry clothes in larger loads to reduce overall drying time.",
      power: 3000,
    },
    "Ceiling Fan": {
      guidance: "Use ceiling fans to circulate air and rely less on air conditioning.",
      power: 75,
    },
    "Television": {
      guidance: "Turn off your TV when not in use, and consider using energy-saving settings.",
      power: 100,
    },
    "Computer": {
      guidance: "Put your computer to sleep when not in use, and turn off the monitor to save energy.",
      power: 200,
    },
    "Water Heater": {
      guidance: "Set your water heater to 120°F for optimal energy efficiency.",
      power: 4500,
    },
    "Toaster": {
      guidance: "Use a toaster instead of an oven for small meals to save energy.",
      power: 800,
    },
    "Electric Kettle": {
      guidance: "Only boil the water you need, and use an electric kettle instead of a stovetop.",
      power: 1500,
    },
    "Vacuum Cleaner": {
      guidance: "Empty the dust bag regularly to ensure efficient vacuuming.",
      power: 1000,
    },
    "Iron": {
      guidance: "Iron clothes in larger batches to reduce overall ironing time.",
      power: 1200,
    },
    "Space Heater": {
      guidance: "Use space heaters only in small rooms, and turn them off when not needed.",
      power: 1500,
    },
    "Hair Dryer": {
      guidance: "Use a lower heat setting when drying your hair to conserve energy.",
      power: 1800,
    },
    "Blender": {
      guidance: "Use short bursts when blending to save energy and prevent overuse.",
      power: 500,
    },
    "Coffee Maker": {
      guidance: "Turn off the coffee maker immediately after brewing to save energy.",
      power: 900,
    },
    "Printer": {
      guidance: "Turn off the printer when not in use, and use energy-saving modes.",
      power: 50,
    },
    "Electric Stove": {
      guidance: "Use the right-sized burner for the pan to avoid wasting energy.",
      power: 1500,
    },
    "Rice Cooker": {
      guidance: "Use a rice cooker instead of a stove for more efficient cooking.",
      power: 700,
    },
    "Dehumidifier": {
      guidance: "Only use the dehumidifier when necessary, and keep doors and windows closed.",
      power: 300,
    },
    "Humidifier": {
      guidance: "Set your humidifier to the ideal humidity level (30%-50%) to save energy.",
      power: 40,
    },
    "Lamp (LED)": {
      guidance: "Use LED bulbs, which are more energy-efficient than incandescent bulbs.",
      power: 10,
    },
    "Heater (Electric)": {
      guidance: "Use space heaters sparingly and only in well-insulated rooms.",
      power: 1000,
    },
    "Gaming Console": {
      guidance: "Turn off the console when not in use, and enable energy-saving settings.",
      power: 150,
    },
    "Treadmill": {
      guidance: "Unplug the treadmill when not in use to save standby power.",
      power: 1200,
    },
    "Projector": {
      guidance: "Use the eco mode on projectors to reduce energy consumption.",
      power: 300,
    }
  };
  
  const electricityRate = 6; // INR per kWh

const calculateCost = (appliance) => {
  const powerInWatts = applianceGuidance[appliance]?.power;
  if (!powerInWatts) return "No power data available"; // Handle case where power data is missing
  
  const powerInKwh = powerInWatts / 1000; // Convert watts to kWh (units)
  const costPerHour = powerInKwh * electricityRate; // Calculate cost for 1 hour of usage
//   return ${appliance} consumes ${powerInKwh.toFixed(2)} units per hour. Cost: ₹${costPerHour.toFixed(2)} per hour.;

  return 'consumes 30 units per hour. Cost: ₹250 per hour';
};
  return (
    <div style={styles.pageContainer}>
      <div style={styles.rectangle}>
        {applianceCategories.map((category, index) => (
          <div key={index} style={styles.item}>
            <label>
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              {category}
            </label>
          </div>
        ))}

        {checkedItems[0] && ( // Kitchen Appliances
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Kitchen Appliances:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {kitchenAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedKitchenItems[index]}
                      onChange={() => handleKitchenCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        {checkedItems[1] && ( // Laundry Appliances
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Laundry Appliances:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {laundryAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedLaundryItems[index]}
                      onChange={() => handleLaundryCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        {checkedItems[2] && ( // Cleaning Appliances
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Cleaning Appliances:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {cleaningAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedCleaningItems[index]}
                      onChange={() => handleCleaningCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        {checkedItems[3] && ( // Heating and Cooling Appliances
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Heating and Cooling Appliances:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {heatingAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedHeatingItems[index]}
                      onChange={() => handleHeatingCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        {checkedItems[4] && ( // Lighting and Power Appliances
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Lighting and Power Appliances:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {lightingAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedLightingItems[index]}
                      onChange={() => handleLightingCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        {checkedItems[5] && ( // Entertainment & Electronics
          <>
            <h3 style={{ textAlign: "center", width: "100%", margin: "10px 0", color: "#fff" }}>
              Select Entertainment & Electronics:
            </h3>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
              {entertainmentAppliances.map((appliance, index) => (
                <div key={index} style={styles.applianceItem}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedEntertainmentItems[index]}
                      onChange={() => handleEntertainmentCheckboxChange(index)}
                    />
                    {appliance}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>


  <button 
  style={{ 
    backgroundColor: "#0ff3f3",  
    color: '#000000', // Red color
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer' 
  }} 
  onClick={handleSubmit}
>
  Submit
</button>

      {/* Container to display selected appliances */}
      {showSelected && ( // Show only if the user has submitted
        <div style={styles.cardContainer}>
        <h3>Selected Appliances</h3>
        {selectedAppliances.map((appliance, index) => (
          <div key={index} style={styles.card}>
          <h4>{appliance}</h4>
          <p style={styles.guidanceText}>{applianceGuidance[appliance]?.guidance || "No guidance available."}</p>
          <p>{calculateCost(appliance)}</p> {/* Display cost information */}
        </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default PinkPage;
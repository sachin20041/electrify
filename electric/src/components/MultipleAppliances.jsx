import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Single Appliance Component
const Appliance = ({ id, name, watt, removeAppliance, updateTotalCharge }) => {
  const [time, setTime] = useState(0); // Time in minutes
  const [isActive, setIsActive] = useState(false); // Whether appliance is running or not
  const intervalRef = useRef(null); // Ref to store the interval ID

  // Start the appliance
  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time every minute
      }, 1000); // 60000 ms = 1 minute
    }
  };

  // Stop the appliance
  const handleStop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  // Clean up the interval when the component is unmounted
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Update the total charge whenever the appliance time changes
  useEffect(() => {
    updateTotalCharge(id, time, watt);
  }, [time, id, watt, updateTotalCharge]);

  return (
    <div style={applianceStyle}>
      <h3>{name} (Watt: {watt})</h3>
      <h4>Time: {time} minute(s)</h4>
      <div style={buttonContainerStyle}>
        <button onClick={handleStart} disabled={isActive} style={buttonStylestart}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isActive} style={buttonStylestop}>
          Stop
        </button>
        <button onClick={() => removeAppliance(id)} style={{ ...buttonStyle, color: 'red' }}>
          Remove
        </button>
      </div>
    </div>
  );
};

// Room Component
const Room = ({ roomId, roomName, removeRoom, updateTotalCharge }) => {
  const [appliances, setAppliances] = useState([]); // Store appliances in the room
  const [totalCharge, setTotalCharge] = useState(0); // Total charge for this room
  const [name, setName] = useState(''); // Appliance name input
  const [watt, setWatt] = useState(''); // Watt input

  // Predefined appliances with emojis and watt values
  const predefinedAppliances = [
    { id: uuidv4(), name: 'Fan 🌀', watt: 75 },
    { id: uuidv4(), name: 'Light Bulb 💡', watt: 10 },
    { id: uuidv4(), name: 'Refrigerator 🧊', watt: 150 },
    { id: uuidv4(), name: 'Television 📺', watt: 100 },
    { id: uuidv4(), name: 'Air Conditioner ❄', watt: 200 }
  ];

  // Create room with predefined appliances
  useEffect(() => {
    setAppliances(predefinedAppliances);
  }, []);

  // Add a new appliance
  const addAppliance = () => {
    if (name && !isNaN(watt) && parseFloat(watt) > 0) {
      setAppliances((prevAppliances) => [
        ...prevAppliances,
        { id: uuidv4(), name, watt: parseFloat(watt) },
      ]);
      setName(''); // Reset name input
      setWatt(''); // Reset watt input
    } else {
      alert("Invalid input. Please provide a valid name and watt.");
    }
  };

  // Remove an appliance by its id
  const removeAppliance = (id) => {
    setAppliances((prevAppliances) => prevAppliances.filter(appliance => appliance.id !== id));
  };

  // Update the total charge when any appliance updates its time
  const updateRoomTotalCharge = (id, time, watt) => {
    setAppliances((prevAppliances) => {
      const updatedAppliances = prevAppliances.map(appliance =>
        appliance.id === id ? { ...appliance, time } : appliance
      );

      // Calculate total charge for this room
      const newTotalCharge = updatedAppliances.reduce((acc, appliance) => {
        const hours = appliance.time / 60; // Convert minutes to hours
        const units = (hours * appliance.watt) / 1000; // Calculate units consumed
        return acc + calculateCharges(units);
      }, 0);

      setTotalCharge(newTotalCharge);
      updateTotalCharge(newTotalCharge); // Update house total charge
      return updatedAppliances;
    });
  };

  const calculateCharges = (units) => {
    let charges = 0;
    if (units > 1) {
      charges += units*2.00;
      ; 
      if (units > 200) {
        charges += Math.min(units - 100, 100) * 2.25; // Units between 100 and 200
        if (units > 400) {
          charges += 100 * 4.50; // Units between 200 and 400
          if (units > 500) {
            charges += 200 * 6.00; // Units between 400 and 600
            if (units > 600) {
              charges += 100 * 8.00; // Units between 600 and 700
              if (units > 800) {
                charges += 100 * 9.00; // Units between 700 and 800
                if (units > 1000) {
                  charges += 200 * 10.00; // Units between 800 and 1000
                  charges += (units - 1000) * 11.00; // Units over 1000
                }
              }
            }
          }
        }
      }
    }
    return charges;
  };

  return (
    <div style={roomStyle}>
      <h2 style={roomHeaderStyle}>{roomName}</h2>
      <button onClick={() => removeRoom(roomId)} style={removeRoomButtonStyle}>Remove Room</button>
      <div style={applianceContainerStyle}>
        {appliances.map((appliance) => (
          <Appliance
            key={appliance.id}
            id={appliance.id}
            name={appliance.name}
            watt={appliance.watt}
            removeAppliance={removeAppliance}
            updateTotalCharge={updateRoomTotalCharge}
          />
        ))}
      </div>
      <div style={addApplianceContainerStyle}>
        <input
          type="text"
          placeholder="Enter Appliance Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Enter Wattage"
          value={watt}
          onChange={(e) => setWatt(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addAppliance} style={addButtonStyle1}>Add Appliance</button>
      </div>
      <h3>Total Charge for Room (in ₹): {totalCharge.toFixed(2)}</h3>
    </div>
  );
};

// Main component to handle multiple rooms and appliances
const MultipleAppliances = () => {
  const [rooms, setRooms] = useState([]); // Store rooms
  const [totalHouseCharge, setTotalHouseCharge] = useState(0); // Total charge of the house
  const [roomName, setRoomName] = useState(''); // Room name input

  // Create a new room with a user-defined name
  const addRoom = () => {
    if (roomName) {
      setRooms((prevRooms) => [
        ...prevRooms,
        { id: uuidv4(), name: roomName }, // Unique ID for the room
      ]);
      setRoomName(''); // Reset room name input
    } else {
      alert("Please provide a valid room name.");
    }
  };

  // Remove a room by its ID
  const removeRoom = (id) => {
    setRooms((prevRooms) => prevRooms.filter(room => room.id !== id));
  };

  // Update the total charge of the house
  const updateTotalCharge = (roomCharge) => {
    setTotalHouseCharge((prevTotal) => prevTotal + roomCharge);
  };


  return (
    <div style={houseStyle}>
      <h1>My House</h1>
      <div style={addRoomContainerStyle}>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addRoom} style={addButtonStyle1}>Add Room</button>
      </div>
      <div style={roomsContainerStyle}>
        {rooms.map((room) => (
          <Room
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            removeRoom={removeRoom}
            updateTotalCharge={updateTotalCharge}
          />
        ))}
      </div>
      <h2>Total Charge for House (in ₹): {totalHouseCharge.toFixed(2)}</h2>
    </div>
  );
};

// Styles
// Styles for the components
const houseStyle = {
  padding: '20px',
  backgroundColor: 'black', // Background color of the main container
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'aqua', // Aqua color for text
};
const roomStyle = {
  border: '1px solid #444', // Darker border to contrast with black background
  borderRadius: '5px',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: '#222', // Complementary dark shade to black
  color: 'aqua',
};

const applianceStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px 0',
};

const roomHeaderStyle = {
  margin: '0 0 10px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  color: '#fff',
};
const buttonStylestop = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor:'red',
  cursor: 'pointer',
  color: '#fff',
};

const buttonStylestart = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor:'green',
  cursor: 'pointer',
  color: '#fff',
};
const addButtonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
};
const addButtonStyle1 = {
  padding: '10px',
  border: 'none',
  color:'white',
  backgroundColor:'green',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #555', // Slightly lighter to show input fields
  borderRadius: '5px',
  marginRight: '10px',
  color: 'aqua',
  backgroundColor: 'black',
};

const addApplianceContainerStyle = {
  margin: '10px 0',
};

const applianceContainerStyle = { // Added this style
  display: 'flex',
  flexDirection: 'column',
};



const roomsContainerStyle = {
  display: 'flex',
  flexDirection: 'row', // Set to row to align rooms horizontally
  justifyContent: 'center', // Centers the rooms horizontally
  flexWrap: 'wrap', // Allows rooms to wrap to the next line if they overflow
  gap: '50px', // Adds space between each room
  width: '100%',
};

const addRoomContainerStyle = { // Added this style
  marginBottom: '10px',
};

const removeRoomButtonStyle = {
  padding: '10px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default MultipleAppliances;
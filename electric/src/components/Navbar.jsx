// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from './Login';
import './Navbar.css'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LogoutIcon from '@mui/icons-material/Logout';
function Navbar() {
  return (
    <header>
    <div className='navbar'>
    <nav>
      <div className='logo'>
      
       <h2>
       <ElectricBoltIcon /> Electrify 
       </h2>
      </div>
       <ul className='nav-list'>
        <li> <Link to='/makehome'>Design Home</Link></li>
        {/* <li ><Link to='/Dashboard'>Dashboard</Link></li> */}
        <li><Link to='/appliance'>Appliances</Link></li>
        <li><Link to='/billing'>Billing</Link></li>
        <li className='logout'><Link to='/Login'>Logout</Link>
        <LogoutIcon/>
        </li>
       </ul>
    </nav>
    </div>
    </header>
  );
}

export default Navbar;

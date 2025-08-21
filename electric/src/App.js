// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Appform from './components/Appform';
import Billoptimizer from './components/Billoptimizer';
import EnergyTips from './components/EnergyTips';
import MultipleAppliances from './components/MultipleAppliances';
import PinkPage from './components/PinkPage';
import ApplianceList from './components/ApplianceList';
import ElectricityBillingSystem from './components/Billing';
import TamilNaduElectricityBilling from './components/Billing';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Navbar' element={<Navbar/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/form' element={<Appform/>}/>
        <Route path='/Billoptimizer' element={<Billoptimizer/>}/>
        <Route path='/energy-tips' element={<EnergyTips/>}/>
        <Route path='/makehome' element={<MultipleAppliances/>}/>
        <Route path='/guidance' element={<PinkPage/>}/>
        <Route path='/appliance' element={<ApplianceList/>}/>
        <Route path='/billing' element={<TamilNaduElectricityBilling/>}/>
      </Routes>
      </BrowserRouter>
   
      {/* <Navbar />
      <Home />
      <Footer /> */}
    </div>
  );
}

export default App;

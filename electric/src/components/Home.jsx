// src/components/Home.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import HomeContent from './HomeContent';
import Navbar from './Navbar';
import Footer from './Footer';
function Home() {
  return (
    <>
  <Navbar/>
  <HomeContent/>
  <Footer/>
    </>
  );
}

export default Home;

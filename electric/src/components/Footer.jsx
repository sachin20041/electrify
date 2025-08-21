// src/components/Footer.js
import React from 'react';
import { IconButton, Container } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.css'; // Import custom CSS for footer styling

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <p>&copy; 2024 Electrify. All rights reserved.</p>
          <div className="social-icons">
            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </IconButton>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <Logo size={50} color="white" showText={true} />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: '0.85' }}>
              Empowering Citizens Through Technology
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/file">File Complaint</a></li>
              <li><a href="/track">Track Status</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@complaints.gov</p>
            <p>Phone: 1800-XXX-XXXX</p>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 AI Complaint Redressal System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

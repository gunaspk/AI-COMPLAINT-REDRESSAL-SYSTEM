import React from 'react';
import './Logo.css';

const Logo = ({ size = 40, color = 'white', showText = true, className = '' }) => {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' }}
      >
        {/* Shield Background */}
        <path
          d="M50 8 L82 22 L82 48 Q82 70 50 92 Q18 70 18 48 L18 22 Z"
          fill="url(#shieldGradient)"
          stroke={color}
          strokeWidth="2.5"
        />
        
        {/* AI Brain Circuit */}
        <circle cx="50" cy="42" r="16" fill="url(#brainGradient)" opacity="0.95" />
        
        {/* Neural Network Lines */}
        <line x1="36" y1="36" x2="28" y2="28" stroke={color} strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
        <line x1="64" y1="36" x2="72" y2="28" stroke={color} strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
        <line x1="36" y1="48" x2="28" y2="56" stroke={color} strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
        <line x1="64" y1="48" x2="72" y2="56" stroke={color} strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
        
        {/* Neural Nodes */}
        <circle cx="28" cy="28" r="4" fill={color} />
        <circle cx="72" cy="28" r="4" fill={color} />
        <circle cx="28" cy="56" r="4" fill={color} />
        <circle cx="72" cy="56" r="4" fill={color} />
        
        {/* Checkmark (Complaint Resolved) */}
        <path
          d="M 42 68 L 48 74 L 58 60"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#764ba2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#667eea" stopOpacity="0.95" />
          </linearGradient>
          
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          lineHeight: '1.2',
          color: color 
        }}>
          <span style={{ 
            fontSize: size > 35 ? '1.3rem' : '1rem', 
            fontWeight: '800',
            letterSpacing: '-0.5px'
          }}>
            AI Complaint
          </span>
          <span style={{ 
            fontSize: size > 35 ? '0.7rem' : '0.6rem', 
            fontWeight: '500',
            opacity: '0.9',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Redressal System
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

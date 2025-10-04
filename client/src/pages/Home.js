import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Trophy, Brain, Zap, MapPin, MessageSquare, TrendingUp, UserX } from 'lucide-react';
import { complaintAPI } from '../api/complaintAPI';
import Logo from '../components/Logo';
import './Home.premium.css';

const Home = () => {
  const [stats, setStats] = useState({ total: 0, submitted: 0, in_progress: 0, resolved: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await complaintAPI.getStats();
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const features = [
    {
      icon: <Brain size={40} />,
      title: 'AI-Powered Detection',
      description: 'Upload a photo and let AI automatically categorize your complaint'
    },
    {
      icon: <Zap size={40} />,
      title: 'Smart Prioritization',
      description: 'Automatic urgency analysis for faster resolution'
    },
    {
      icon: <MapPin size={40} />,
      title: 'Location Tracking',
      description: 'GPS auto-tagging ensures your complaint reaches the right department'
    },
    {
      icon: <MessageSquare size={40} />,
      title: 'WhatsApp Integration',
      description: 'File complaints directly via WhatsApp bot'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Real-Time Tracking',
      description: 'Track complaint status from submission to resolution'
    },
    {
      icon: <UserX size={40} />,
      title: 'Anonymous Mode',
      description: 'Report sensitive issues while maintaining privacy'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Logo size={120} color="white" showText={false} className="pulse-logo" />
          </div>
          <h1 className="hero-title">Empowering Citizens Through AI</h1>
          <p className="hero-subtitle">
            Report civic issues instantly. Track complaints in real-time. Drive change in your community.
          </p>
          <div className="hero-buttons">
            <Link to="/file" className="btn btn-primary btn-lg">
              <FileText size={20} />
              File a Complaint
            </Link>
            <Link to="/track" className="btn btn-outline btn-lg">
              <Search size={20} />
              Track Status
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FileText size={40} />
              </div>
              <div className="stat-number">{stats.total > 0 ? stats.total : '150'}</div>
              <div className="stat-label">Complaints Filed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">
                <TrendingUp size={40} />
              </div>
              <div className="stat-number">{stats.resolved > 0 ? stats.resolved : '120'}</div>
              <div className="stat-label">Issues Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon warning">
                <Zap size={40} />
              </div>
              <div className="stat-number">{stats.in_progress > 0 ? stats.in_progress : '25'}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon primary">
                <Trophy size={40} />
              </div>
              <div className="stat-number">6</div>
              <div className="stat-label">Active Departments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="gradient-text">Our Platform</span>?
            </h2>
            <p className="section-subtitle">
              Cutting-edge technology meets civic responsibility for faster, smarter complaint resolution
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{color: 'white'}}>How It Works</h2>
            <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.9)'}}>
              Simple, fast, and effective complaint resolution in 4 easy steps
            </p>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Report Issue</h3>
                <p>Upload photo and describe the problem with location details</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Analysis</h3>
                <p>Our intelligent system categorizes and prioritizes automatically</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Department Action</h3>
                <p>Complaint is routed to the correct department for immediate action</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Issue Resolved</h3>
                <p>Track real-time status updates until complete resolution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of citizens making their communities better</p>
            <Link to="/file" className="btn btn-light btn-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

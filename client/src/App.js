import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FileComplaint from './pages/FileComplaint';
import TrackComplaint from './pages/TrackComplaint';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file" element={<FileComplaint />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/track/:id" element={<TrackComplaint />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

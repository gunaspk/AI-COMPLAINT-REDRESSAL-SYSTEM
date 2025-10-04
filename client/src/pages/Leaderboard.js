import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { complaintAPI } from '../api/complaintAPI';
import './Leaderboard.enhanced.css';
import './Leaderboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Leaderboard = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await complaintAPI.getLeaderboard();
      if (response.data.success) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '🏆';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  const getMedalClass = (index) => {
    if (index === 0) return 'medal-gold';
    if (index === 1) return 'medal-silver';
    if (index === 2) return 'medal-bronze';
    return '';
  };

  const chartData = {
    labels: departments.map(d => d.name),
    datasets: [
      {
        label: 'Resolved Complaints',
        data: departments.map(d => d.complaints_resolved),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
      {
        label: 'Total Complaints',
        data: departments.map(d => d.total_complaints),
        backgroundColor: 'rgba(29, 78, 216, 0.8)',
        borderColor: 'rgba(29, 78, 216, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Department Performance Overview',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="leaderboard-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Trophy size={40} />
            Department Leaderboard
          </h1>
          <p className="subtitle">Top Performing Departments</p>
        </div>

        {/* Top 3 Podium */}
        {departments.length >= 3 && (
          <div className="podium">
            {/* 2nd Place */}
            <div className="podium-item second">
              <div className="medal-icon">🥈</div>
              <h3>2nd Place</h3>
              <h4>{departments[1].name}</h4>
              <div className="podium-stats">
                <p><strong>Resolved:</strong> {departments[1].complaints_resolved}</p>
                <p><strong>Rate:</strong> {departments[1].resolution_rate}%</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="podium-item first">
              <div className="medal-icon">🏆</div>
              <h3>1st Place</h3>
              <h4>{departments[0].name}</h4>
              <div className="podium-stats">
                <p><strong>Resolved:</strong> {departments[0].complaints_resolved}</p>
                <p><strong>Rate:</strong> {departments[0].resolution_rate}%</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="podium-item third">
              <div className="medal-icon">🥉</div>
              <h3>3rd Place</h3>
              <h4>{departments[2].name}</h4>
              <div className="podium-stats">
                <p><strong>Resolved:</strong> {departments[2].complaints_resolved}</p>
                <p><strong>Rate:</strong> {departments[2].resolution_rate}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="card chart-card">
          <h3>
            <TrendingUp size={24} />
            Performance Chart
          </h3>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Full Table */}
        <div className="card table-card">
          <h3>All Departments</h3>
          <div className="table-responsive">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Department</th>
                  <th>Total</th>
                  <th>Resolved</th>
                  <th>Resolution Rate</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept.name} className={getMedalClass(index)}>
                    <td>
                      <span className="rank-badge">{getMedalIcon(index)}</span>
                    </td>
                    <td className="dept-name">{dept.name}</td>
                    <td>{dept.total_complaints}</td>
                    <td>
                      <span className="badge badge-success">{dept.complaints_resolved}</span>
                    </td>
                    <td>
                      <strong>{dept.resolution_rate}%</strong>
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${dept.resolution_rate}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

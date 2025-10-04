import React, { useState, useEffect } from 'react';
import { Shield, Filter, Search, Play, Check, Eye, RefreshCw } from 'lucide-react';
import { complaintAPI } from '../api/complaintAPI';
import './Admin.enhanced.css';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, submitted: 0, in_progress: 0, resolved: 0 });
  
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchComplaints();
    fetchStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, complaints]);

  const fetchComplaints = async () => {
    try {
      const response = await complaintAPI.getAllComplaints();
      if (response.data.success) {
        setComplaints(response.data.complaints);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const applyFilters = () => {
    let filtered = [...complaints];

    if (filters.status) {
      filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(c => c.priority === filters.priority);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
      );
    }

    setFilteredComplaints(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: '', priority: '', search: '' });
  };

  const updateStatus = async (complaintId, newStatus) => {
    if (!window.confirm(`Mark this complaint as "${newStatus}"?`)) return;

    try {
      const response = await complaintAPI.updateComplaintStatus(complaintId, newStatus);
      if (response.data.success) {
        alert('Status updated successfully!');
        fetchComplaints();
        fetchStats();
      }
    } catch (error) {
      alert('Error updating status');
      console.error(error);
    }
  };

  const viewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'badge-high';
    if (priority === 'Medium') return 'badge-medium';
    return 'badge-low';
  };

  const getStatusClass = (status) => {
    if (status === 'Submitted') return 'badge-primary';
    if (status === 'In Progress') return 'bg-warning';
    return 'bg-success';
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>
            <Shield size={40} />
            Admin Dashboard
          </h1>
          <button className="btn btn-primary" onClick={() => { fetchComplaints(); fetchStats(); }}>
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-box total">
            <div className="stat-content">
              <p>Total Complaints</p>
              <h2>{stats.total}</h2>
            </div>
            <div className="stat-icon">📋</div>
          </div>

          <div className="stat-box submitted">
            <div className="stat-content">
              <p>Submitted</p>
              <h2>{stats.submitted}</h2>
            </div>
            <div className="stat-icon">⏱️</div>
          </div>

          <div className="stat-box progress">
            <div className="stat-content">
              <p>In Progress</p>
              <h2>{stats.in_progress}</h2>
            </div>
            <div className="stat-icon">⚙️</div>
          </div>

          <div className="stat-box resolved">
            <div className="stat-content">
              <p>Resolved</p>
              <h2>{stats.resolved}</h2>
            </div>
            <div className="stat-icon">✅</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-panel">
          <h3>
            <Filter size={20} />
            Filters
          </h3>
          <div className="filter-grid">
            <div className="form-group">
              <label>Status</label>
              <select 
                className="form-control"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select 
                className="form-control"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>&nbsp;</label>
              <button className="btn btn-secondary btn-block" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="card">
          <h3>All Complaints ({filteredComplaints.length})</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(complaint => (
                  <tr key={complaint.id}>
                    <td>
                      <strong>{complaint.id}</strong>
                      {complaint.anonymous && <span className="anonymous-badge">🕵️</span>}
                    </td>
                    <td>
                      <span className="badge badge-info">{complaint.category}</span>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityClass(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusClass(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="description-cell">
                      {complaint.description.substring(0, 50)}...
                    </td>
                    <td>
                      <small>{new Date(complaint.timestamp).toLocaleDateString()}</small>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {complaint.status === 'Submitted' && (
                          <button 
                            className="btn-action btn-warning"
                            onClick={() => updateStatus(complaint.id, 'In Progress')}
                            title="Start"
                          >
                            <Play size={16} />
                          </button>
                        )}
                        {complaint.status === 'In Progress' && (
                          <button 
                            className="btn-action btn-success"
                            onClick={() => updateStatus(complaint.id, 'Resolved')}
                            title="Resolve"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button 
                          className="btn-action btn-info"
                          onClick={() => viewDetails(complaint)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedComplaint && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Complaint Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>ID:</strong> {selectedComplaint.id}
              </div>
              <div className="detail-row">
                <strong>Category:</strong> 
                <span className="badge badge-info">{selectedComplaint.category}</span>
              </div>
              <div className="detail-row">
                <strong>Priority:</strong> 
                <span className={`badge ${getPriorityClass(selectedComplaint.priority)}`}>
                  {selectedComplaint.priority}
                </span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`badge ${getStatusClass(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
              </div>
              <div className="detail-row">
                <strong>Description:</strong> {selectedComplaint.description}
              </div>
              <div className="detail-row">
                <strong>Location:</strong> {selectedComplaint.location || 'Not specified'}
              </div>
              <div className="detail-row">
                <strong>Submitted:</strong> {new Date(selectedComplaint.timestamp).toLocaleString()}
              </div>
              {selectedComplaint.image_path && (
                <div className="detail-row">
                  <strong>Image:</strong><br />
                  <img 
                    src={`http://localhost:5000/static/${selectedComplaint.image_path}`} 
                    alt="Complaint"
                    className="modal-image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

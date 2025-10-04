import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, CheckCircle, Clock, Loader } from 'lucide-react';
import { complaintAPI } from '../api/complaintAPI';
import './TrackComplaint.enhanced.css';

const TrackComplaint = () => {
  const { id } = useParams();
  const [complaintId, setComplaintId] = useState(id || '');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) {
      setError('Please enter a complaint ID');
      return;
    }

    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const response = await complaintAPI.getComplaintById(complaintId.trim());
      if (response.data.success) {
        setComplaint(response.data.complaint);
      } else {
        setError(response.data.message || 'Complaint not found');
      }
    } catch (err) {
      setError('Complaint not found. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Submitted') return 'status-submitted';
    if (status === 'In Progress') return 'status-progress';
    if (status === 'Resolved') return 'status-resolved';
    return '';
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      'High': 'badge-high',
      'Medium': 'badge-medium',
      'Low': 'badge-low'
    };
    return `badge ${classes[priority] || ''}`;
  };

  React.useEffect(() => {
    if (id) {
      handleSearch({ preventDefault: () => {} });
    }
  }, [id]);

  return (
    <div className="track-page">
      <div className="container">
        <div className="track-container">
          <div className="card">
            <h2 className="page-title">
              <Search size={30} />
              Track Your Complaint
            </h2>

            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  placeholder="Enter Complaint ID (e.g., CMP202501011234)"
                  disabled={loading}
                />
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Track
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            {complaint && (
              <div className="complaint-details">
                {/* Progress Steps */}
                <div className="progress-steps">
                  <div className={`step ${complaint.status === 'Submitted' || complaint.status === 'In Progress' || complaint.status === 'Resolved' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div className="step-label">Submitted</div>
                  </div>
                  <div className="step-line"></div>
                  <div className={`step ${complaint.status === 'In Progress' || complaint.status === 'Resolved' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <Loader size={24} />
                    </div>
                    <div className="step-label">In Progress</div>
                  </div>
                  <div className="step-line"></div>
                  <div className={`step ${complaint.status === 'Resolved' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <CheckCircle size={24} />
                    </div>
                    <div className="step-label">Resolved</div>
                  </div>
                </div>

                <hr />

                {/* Details */}
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Complaint ID:</span>
                    <span className="detail-value">{complaint.id}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category:</span>
                    <span className="badge badge-primary">{complaint.category}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Priority:</span>
                    <span className={getPriorityBadge(complaint.priority)}>{complaint.priority}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`badge ${getStatusClass(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>

                  <div className="detail-item full-width">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{complaint.description}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{complaint.location || 'Not specified'}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Submitted:</span>
                    <span className="detail-value">
                      {new Date(complaint.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {complaint.image_path && (
                    <div className="detail-item full-width">
                      <span className="detail-label">Uploaded Image:</span>
                      <img 
                        src={`http://localhost:5000/static/${complaint.image_path}`} 
                        alt="Complaint" 
                        className="complaint-image"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {!complaint && !loading && !error && (
              <div className="empty-state">
                <Clock size={60} />
                <p>Enter your Complaint ID to track its status</p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>💡 Quick Tip</h4>
            <p>Save your Complaint ID for future reference. You can track your complaint status anytime using this ID.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaint;

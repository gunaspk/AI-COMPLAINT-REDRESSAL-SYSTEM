import React, { useState, useEffect } from 'react';
import { Upload, MapPin, Check, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { complaintAPI } from '../api/complaintAPI';
import './FileComplaint.enhanced.css';
import 'leaflet/dist/leaflet.css';

const FileComplaint = () => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    anonymous: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (formData.description.length > 10) {
      detectPriority(formData.description);
    }
  }, [formData.description]);

  const detectPriority = (text) => {
    const high = ['urgent', 'emergency', 'dangerous', 'severe', 'critical', 'broken'];
    const medium = ['repair', 'fix', 'problem', 'issue'];
    
    const lowerText = text.toLowerCase();
    if (high.some(keyword => lowerText.includes(keyword))) {
      setPriority('High');
    } else if (medium.some(keyword => lowerText.includes(keyword))) {
      setPriority('Medium');
    } else {
      setPriority('Low');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      
      // Call AI analysis
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await complaintAPI.analyzeImage(formData);
        if (response.data.success) {
          setCategory(response.data.category);
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setFormData(prev => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString(),
            location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          }));
          setPosition([lat, lng]);
        },
        (error) => {
          alert('Unable to get location');
        }
      );
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        }));
        setPosition([lat, lng]);
      },
    });

    return position === null ? null : <Marker position={position}></Marker>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('latitude', formData.latitude);
    submitData.append('longitude', formData.longitude);
    submitData.append('anonymous', formData.anonymous);
    
    if (image) {
      submitData.append('image', image);
    }

    try {
      const response = await complaintAPI.createComplaint(submitData);
      if (response.data.success) {
        setComplaintId(response.data.complaint_id);
        setShowSuccess(true);
        // Reset form
        setFormData({
          description: '',
          location: '',
          latitude: '',
          longitude: '',
          anonymous: false,
        });
        setImage(null);
        setImagePreview(null);
        setCategory('');
        setPriority('');
        setPosition(null);
      }
    } catch (error) {
      alert('Error submitting complaint');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-complaint-page">
      <div className="container">
        <div className="form-container">
          <div className="card">
            <h2 className="page-title">
              <Upload size={30} />
              File a Complaint
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Description */}
              <div className="form-group">
                <label className="form-label">Describe the Issue *</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Please describe the civic issue in detail..."
                  required
                />
                {priority && (
                  <div className={`priority-badge badge-${priority.toLowerCase()}`}>
                    <AlertCircle size={16} />
                    Detected Priority: {priority}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Upload Photo (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                    {category && (
                      <div className="ai-badge">
                        🤖 AI Detected: {category}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">Location</label>
                <div className="location-input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location or use GPS"
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={getLocation}
                  >
                    <MapPin size={18} />
                    Get Location
                  </button>
                </div>
                {position && (
                  <div className="map-container">
                    <MapContainer center={position} zoom={15} style={{ height: '300px', borderRadius: '10px' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationMarker />
                    </MapContainer>
                  </div>
                )}
              </div>

              {/* Anonymous */}
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                  />
                  <span>Submit Anonymously</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Submit Complaint
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Check size={40} />
              <h3>Complaint Submitted Successfully!</h3>
            </div>
            <div className="modal-body">
              <p className="complaint-id-label">Complaint ID</p>
              <h2 className="complaint-id">{complaintId}</h2>
              <p className="modal-note">Please save this ID to track your complaint status.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => {
                setShowSuccess(false);
                window.location.href = `/track/${complaintId}`;
              }}>
                Track Complaint
              </button>
              <button className="btn btn-secondary" onClick={() => setShowSuccess(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileComplaint;

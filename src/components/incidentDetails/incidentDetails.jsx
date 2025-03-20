
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./incidentDetails.css";

function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // this is Mock data we need to fetch this based on the ID
  const [incident, setIncident] = useState({
    id: id,
    type: "Medical",
    description: "Person having chest pain",
    location: "123 Main St",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    status: "New",
    priority: "High",
    reportedAt: "2025-03-19T10:30:00",
    reportedBy: {
      name: "John Doe",
      phone: "555-123-4567",
    },
  });

  const [statusUpdate, setStatusUpdate] = useState("");

  const handleStatusChange = (newStatus) => {
    setIncident({ ...incident, status: newStatus });
    // In a real app, you would send this update to your backend
  };

  const handleAddUpdate = () => {
    if (statusUpdate.trim()) {
      // In a real app, you would send this update to your backend
      alert(`Update added: ${statusUpdate}`);
      setStatusUpdate("");
    }
  };

  return (
    <div className="incident-details-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        &larr; Back to Dashboard
      </button>

      <div className="incident-details-card">
        <div className="incident-details-header">
          <h2>
            {incident.type} Emergency - {incident.priority} Priority
          </h2>
          <span
            className={`status-badge status-${incident.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {incident.status}
          </span>
        </div>

        <div className="incident-info-section">
          <div className="info-row">
            <span className="info-label">Description:</span>
            <span className="info-value">{incident.description}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Location:</span>
            <span className="info-value">{incident.location}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Reported At:</span>
            <span className="info-value">
              {new Date(incident.reportedAt).toLocaleString()}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Reported By:</span>
            <span className="info-value">
              {incident.reportedBy.name} ({incident.reportedBy.phone})
            </span>
          </div>
        </div>

        <div className="map-placeholder">
          [Map would be displayed here in production]
        </div>

        <div className="status-controls">
          <h3>Update Status</h3>
          <div className="status-buttons">
            <button
              onClick={() => handleStatusChange("Acknowledged")}
              className={incident.status === "Acknowledged" ? "active" : ""}
            >
              Acknowledge
            </button>
            <button
              onClick={() => handleStatusChange("Dispatched")}
              className={incident.status === "Dispatched" ? "active" : ""}
            >
              Dispatch
            </button>
            <button
              onClick={() => handleStatusChange("En Route")}
              className={incident.status === "En Route" ? "active" : ""}
            >
              En Route
            </button>
            <button
              onClick={() => handleStatusChange("On Scene")}
              className={incident.status === "On Scene" ? "active" : ""}
            >
              On Scene
            </button>
            <button
              onClick={() => handleStatusChange("Resolved")}
              className={incident.status === "Resolved" ? "active" : ""}
            >
              Resolved
            </button>
          </div>
        </div>

        <div className="communication-section">
          <h3>Add Status Update</h3>
          <textarea
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value)}
            placeholder="Enter status update or notes..."
          ></textarea>
          <button onClick={handleAddUpdate}>Add Update</button>
        </div>
      </div>
    </div>
  );
}

export default IncidentDetails;

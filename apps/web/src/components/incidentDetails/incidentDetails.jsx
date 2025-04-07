import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data — we need to  fetch this based on ID
  const [incident, setIncident] = useState({
    id: parseInt(id),
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
    const updated = { ...incident, status: newStatus };
    setIncident(updated);
  };

  const handleAddUpdate = () => {
    if (statusUpdate.trim()) {
      alert(`Update added: ${statusUpdate}`);
      setStatusUpdate("");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard", { state: { updatedIncident: incident } });
  };

  return (
    <div className="incident-details-container container-fluid">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={handleBackToDashboard}
      >
        &larr; Back to Dashboard
      </button>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">
            {incident.type} Emergency - {incident.priority} Priority
          </h4>
          <span className={`badge bg-info text-dark`}>{incident.status}</span>
        </div>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Description:</strong> {incident.description}
          </li>
          <li className="list-group-item">
            <strong>Location:</strong> {incident.location}
          </li>
          <li className="list-group-item">
            <strong>Reported At:</strong>{" "}
            {new Date(incident.reportedAt).toLocaleString()}
          </li>
          <li className="list-group-item">
            <strong>Reported By:</strong> {incident.reportedBy.name} (
            {incident.reportedBy.phone})
          </li>
        </ul>

        <div className="mb-4 text-muted">
          [Map would be displayed here in production]
        </div>

        <div className="mb-4">
          <h5>Update Status</h5>
          <div className="btn-group flex-wrap gap-2">
            {[
              "Acknowledged",
              "Dispatched",
              "En Route",
              "On Scene",
              "Resolved",
            ].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`btn btn-sm ${
                  incident.status === status
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5>Add Status Update</h5>
          <textarea
            className="form-control mb-2"
            rows={2}
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value)}
            placeholder="Enter status update or notes..."
          ></textarea>
          <button className="btn btn-success" onClick={handleAddUpdate}>
            Add Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncidentDetails;

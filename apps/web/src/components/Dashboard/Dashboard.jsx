
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  // Mock data - we need would fetch this from your API
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "Medical",
      location: "123 Main St",
      status: "New",
      priority: "High",
      reportedAt: "2025-03-19T10:30:00",
    },
    {
      id: 2,
      type: "Fire",
      location: "456 Oak Ave",
      status: "Dispatched",
      priority: "Critical",
      reportedAt: "2025-03-19T10:15:00",
    },
    {
      id: 3,
      type: "Police",
      location: "789 Pine St",
      status: "In Progress",
      priority: "Medium",
      reportedAt: "2025-03-19T09:45:00",
    },
  ]);

  return (
    <div className="dashboard-container">
      <h2>Active Incidents</h2>
      <div className="incident-filters">
        <select defaultValue="all">
          <option value="all">All Types</option>
          <option value="medical">Medical</option>
          <option value="fire">Fire</option>
          <option value="police">Police</option>
        </select>
        <select defaultValue="all">
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="incidents-list">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`incident-card priority-${incident.priority.toLowerCase()}`}
          >
            <div className="incident-header">
              <span className="incident-type">{incident.type}</span>
              <span
                className={`incident-status status-${incident.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {incident.status}
              </span>
            </div>
            <div className="incident-location">{incident.location}</div>
            <div className="incident-time">
              Reported: {new Date(incident.reportedAt).toLocaleTimeString()}
            </div>
            <div className="incident-actions">
              <Link to={`/incident/${incident.id}`} className="btn-details">
                View Details
              </Link>
              <button className="btn-respond">Respond</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

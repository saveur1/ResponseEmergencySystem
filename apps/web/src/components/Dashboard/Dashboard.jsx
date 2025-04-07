import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

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


  const [typeFilter, setTypeFilter] = useState("All Types");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [sortBy, setSortBy] = useState("priority");
  const [sortOrder, setSortOrder] = useState("desc"); 


  const typeOptions = ["All Types", "Medical", "Fire", "Police"];
  const priorityOptions = [
    "All Priorities",
    "Critical",
    "High",
    "Medium",
    "Low",
  ];
  const sortOptions = [
    { value: "priority-desc", label: "Priority: High to Low" },
    { value: "priority-asc", label: "Priority: Low to High" },
    { value: "time-desc", label: "Time: Newest First" },
    { value: "time-asc", label: "Time: Oldest First" },
  ];

  useEffect(() => {
    const updated = location.state?.updatedIncident;
    if (updated) {
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === updated.id ? updated : inc))
      );

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRespond = (incidentId) => {
    const updatedIncidents = incidents.map((inc) =>
      inc.id === incidentId ? { ...inc, status: "Responding" } : inc
    );
    setIncidents(updatedIncidents);
    navigate(`/incident/${incidentId}`);
  };

  // Handling sort change from dropdown
  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, order] = value.split("-");
    setSortBy(field);
    setSortOrder(order);
  };

  // Priority rank for sorting
  const priorityRank = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Function to sort incidents
  const sortedIncidents = [...incidents]
    .filter(
      (incident) => typeFilter === "All Types" || incident.type === typeFilter
    )
    .filter(
      (incident) =>
        priorityFilter === "All Priorities" ||
        incident.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        // Sort by priority (by using the rank)
        return sortOrder === "asc"
          ? priorityRank[a.priority] - priorityRank[b.priority]
          : priorityRank[b.priority] - priorityRank[a.priority];
      } else if (sortBy === "time") {
        // Sort by reported time
        return sortOrder === "asc"
          ? new Date(a.reportedAt) - new Date(b.reportedAt)
          : new Date(b.reportedAt) - new Date(a.reportedAt);
      }
      return 0;
    });

  return (
    <div className="dashboard-container">
      <h1>Active Incidents</h1>

      <div className="filter-section">
        <div className="filter-group">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-dropdown"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-dropdown"
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
            className="filter-dropdown"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="incidents-list">
        {sortedIncidents.map((incident) => (
          <div
            key={incident.id}
            className={`incident-card priority-${incident.priority.toLowerCase()}`}
          >
            <div className="incident-header">
              <div className="incident-type">{incident.type}</div>
              <div className="incident-status">{incident.status}</div>
            </div>
            <div className="incident-location">{incident.location}</div>
            <div className="incident-details">
              <div className="incident-time">
                Reported: {new Date(incident.reportedAt).toLocaleTimeString()}
              </div>
              <div className="incident-priority">
                Priority: {incident.priority}
              </div>
            </div>
            <div className="incident-actions">
              
              <button
                className="btn btn-primary"
                onClick={() => handleRespond(incident.id)}
              >
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

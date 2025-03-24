
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { fetchEmergencies } from "../../actions/emergency";

function Dashboard() {
  // Mock data - we need would fetch this from our API
  const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        // Fetch incidents from the API
        const handleFetchIncidents = async () => {
                const emergencies = await fetchEmergencies();
                console.log(emergencies);
                setIncidents(emergencies?.sort((a, b) => b.timestamp - a.timestamp));
          
        }
        
        handleFetchIncidents();
    });


  const handleRespond = (incidentId) => {
    // Update incident status in the database
    // make an API call
    console.log(`Responding to incident ${incidentId}`);

    // Change status to "Responding"
   
    const updatedIncidents = incidents.map((inc) =>
      inc.id === incidentId ? { ...inc, status: "Responding" } : inc
    );
    setIncidents(updatedIncidents);

    // Navigate to the incident details page
    navigate(`/incident/${incidentId}`);
  };

 
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
        {incidents?.map((incident) => (
          <div
            key={incident?.id}
            className={`incident-card priority-${incident?.priority?.toLowerCase()}`}
          >
            <div className="incident-header">
              <span className="incident-type">{incident?.type}</span>
              <span
                className={`incident-status status-${incident?.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {incident?.status}
              </span>
            </div>
            <div className="incident-location">
                <a href={`https://www.google.com/maps?q=${incident?.location?.latitude},${incident?.location?.longitude}`} target="_blank">Open in Google Maps</a>
            </div>
            <div className="incident-time">
              Reported: {new Date(incident?.timestamp)?.toLocaleString()}
            </div>
            <div className="incident-actions">
              <Link to={`/incident/${incident?.id}`} className="btn-details">
                View Details
              </Link>
              <button
                className="btn-respond"
                onClick={() => handleRespond(incident?.id)}
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

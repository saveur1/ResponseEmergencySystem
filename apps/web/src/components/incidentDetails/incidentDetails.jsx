import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmergencies } from "../../actions/emergency";

function IncidentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [incident, setIncident] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const emergencies = await fetchEmergencies();
                const selectedIncident = emergencies.find((emergency) => emergency.id === id);
                setIncident(selectedIncident);
            } catch (error) {
                console.error("Error fetching incident:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncident();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await updateEmergencyStatus(id, { status: newStatus });
            setIncident({ ...incident, status: newStatus });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleAddUpdate = async () => {
        if (statusUpdate.trim()) {
            try {
                await updateEmergencyStatus(id, { notes: statusUpdate });
                alert(`Update added: ${statusUpdate}`);
                setStatusUpdate("");
            } catch (error) {
                console.error("Error adding update:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!incident) {
        return <div>Incident not found</div>;
    }

    const handleLocationClick = () => {
        const { latitude, longitude } = incident.location || {};
        if (latitude && longitude) {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
            window.open(googleMapsUrl, "_blank");
        } else {
            alert("Location information is not available.");
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
                        <span
                            className="info-value location-link"
                            onClick={handleLocationClick}
                            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                        >
                            {incident.location?.address || "N/A"} (
                            Lat: {incident.location?.latitude || "N/A"}, 
                            Long: {incident.location?.longitude || "N/A"})
                        </span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Reported At:</span>
                        <span className="info-value">
                            {new Date(incident.timestamp).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="status-controls">
                    <h3>Update Status</h3>
                    <div className="status-buttons">
                        {["Acknowledged", "Dispatched", "En Route", "On Scene", "Resolved"].map(
                            (status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={incident.status === status ? "active" : ""}
                                >
                                    {status}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div className="communication-section">
                    <h3>Add Status Update</h3>
                    
                    <button style={{
                        width:"100%"
                    }} onClick={handleAddUpdate}>Update status</button>
                </div>
            </div>
        </div>
    );
}

export default IncidentDetails;

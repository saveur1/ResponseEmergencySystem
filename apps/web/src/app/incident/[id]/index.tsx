import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmergencies } from "actions/emergency";

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

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (!incident) return <div className="text-center text-red-600">Incident not found</div>;

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
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <button 
                className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" 
                onClick={() => navigate("/")}
            >
                &larr; Back to Dashboard
            </button>

            <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold">{incident.type} Emergency - {incident.priority} Priority</h2>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-${incident.status === "Resolved" ? "green" : "red"}-500`}>
                    {incident.status}
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <span className="font-semibold">Description:</span>
                    <p className="text-gray-700">{incident.description}</p>
                </div>
                <div>
                    <span className="font-semibold">Location:</span>
                    <p className="text-blue-600 underline cursor-pointer" onClick={handleLocationClick}>
                        {incident.location?.address || "N/A"} (Lat: {incident.location?.latitude || "N/A"}, Long: {incident.location?.longitude || "N/A"})
                    </p>
                </div>
                <div>
                    <span className="font-semibold">Reported At:</span>
                    <p className="text-gray-700">{new Date(incident.timestamp).toLocaleString()}</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Update Status</h3>
                <div className="flex gap-2 mt-2">
                    {["Acknowledged", "Dispatched", "En Route", "On Scene", "Resolved"].map((status) => (
                        <button 
                            key={status} 
                            className={`px-4 py-2 rounded-md text-white ${incident.status === status ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}`}
                            onClick={() => handleStatusChange(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Add Status Update</h3>
                <textarea 
                    className="w-full mt-2 p-2 border rounded-md" 
                    value={statusUpdate} 
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    placeholder="Enter status update"
                ></textarea>
                <button 
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Update Status
                </button>
            </div>
        </div>
    );
}

export default IncidentDetails;
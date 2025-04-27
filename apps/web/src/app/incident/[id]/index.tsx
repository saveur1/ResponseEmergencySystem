import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmergencies, updateEmergencyStatus } from "actions/emergency";
import { tEmergency, UserShape } from "@/types";
import { getUserDetailsById } from "@/actions/users";
import { AssignDispatcherModol } from "@/components/modals/assign-dispatcher";

function IncidentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [incident, setIncident] = useState<tEmergency>();
    const [reportedBy, setReportedBy] = useState<UserShape  | null>(null);
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

        const fetchReportedBy = async () => {
            if (incident) {
                try {
                    const user = await getUserDetailsById(incident.reportedBy);
                    setReportedBy(user);
                } catch (error) {
                    console.error("Error fetching reported by user:", error);
                }
            }
        }

        fetchIncident();
        fetchReportedBy();
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

    const handleStatusChange = async (status: string) => {
        if (!incident) return;

        try {
            setLoading(true);
            const updatedIncident = await updateEmergencyStatus(incident?.id, status);
            setIncident(updatedIncident);
        } catch (error) {
            alert("Failed to update status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <button 
                        className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" 
                        onClick={() => navigate("/")}
                    >
                        &larr; Back to Dashboard
                    </button>

                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-2xl font-bold">{incident.type} Emergency - {incident.priority} Priority</h2>
                        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-${incident.status === "resolved" ? "green" : "red"}-500`}>
                            {incident.status}
                        </span>
                    </div>
                </div>
                <AssignDispatcherModol>
                    <div className="flex items-center gap-4">
                        <img 
                            src={reportedBy?.profileImageUrl || "/avatar.png"} 
                            alt={reportedBy?.fullName || "Unknown User"} 
                            className="w-12 h-12 rounded-full border border-black/10 object-cover"
                        />
                        <div>
                            <p className="font-semibold">{reportedBy?.fullName || "Unknown User"}</p>
                            <p className="text-gray-500 text-sm">Reported By</p>
                        </div>
                    </div>
                </AssignDispatcherModol>
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
                    {["pending", "dispatched", "in-progress", "resolved", "cancelled"].map((status) => (
                    <button 
                        key={status} 
                        className={`px-4 py-2 capitalize rounded-md text-white ${incident.status === status ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}`}
                        onClick={() => handleStatusChange(status)}
                    >
                        { status?.split("-").join(" ") }
                    </button>
                    ))}
                </div>
            </div>

            {incident?.images && incident.images.length > 0 && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Incident Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {incident.images.map((image, index) => (
                    <img 
                    key={index} 
                    src={image} 
                    alt={`Incident Image ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-md shadow-md"
                    />
                ))}
                </div>
            </div>
            )}

            {incident?.videos && incident.videos.length > 0 && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Incident Videos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {incident.videos.map((video, index) => (
                    <div key={index} className="relative">
                    <video
                        src={video}
                        controls
                        className="w-full h-32 object-cover rounded-md shadow-md"
                    >
                        Your browser does not support the video tag.
                    </video>
                    </div>
                ))}
                </div>
            </div>
            )}

            {incident?.audio && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Incident Audio</h3>
                <div className="flex items-center gap-2">
                <audio controls className="w-full">
                    <source src={ incident.audio } type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                </div>
            </div>
            )}
        </div>
    );
}

export default IncidentDetails;
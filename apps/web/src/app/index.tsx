import React, { useState, useEffect } from "react";
import { fetchEmergencies } from "actions/emergency";
import { tEmergency } from "types";
import IncidentCard from "@/components/cards/incident-card";
 {/* to be removed after */ }

function Dashboard() {
    const [incidents, setIncidents] = useState<tEmergency[]>([]);
    const [filteredIncidents, setFilteredIncidents] = useState<tEmergency[]>([]);
    const [stats, setStats] = useState({
            resolution: 0,
            pending: 0,
            cancellation: 0,
            dispatched: 0,
    });


    useEffect(() => {
        const handleFetchIncidents = async () => {
            const emergencies: tEmergency[] = await fetchEmergencies();
            setIncidents(emergencies?.sort((a, b) => b.timestamp - a.timestamp));
            setFilteredIncidents(emergencies?.sort((a, b) => b.timestamp - a.timestamp));

            // Resolved emergencies
            let resolution = emergencies.filter((incident) => incident.status === "resolved").length;
            resolution = Math.round((resolution / emergencies.length) * 100);
            if (isNaN(resolution))
                resolution = 0;
            
            // Pending emergencies
            const pending = emergencies.filter((incident) => incident.status === "pending").length;

            // Cancelled emergencies
            let cancellation = emergencies.filter((incident) => incident.status === "cancelled").length;
            cancellation = Math.round((cancellation / emergencies.length) * 100);
            if (isNaN(cancellation))
                cancellation = 0;

            const dispatched = emergencies.filter((incident) => incident.status === "dispatched").length;

            setStats({ resolution, pending, cancellation, dispatched });
        };

        handleFetchIncidents();
    }, []);

    const handleFilterByType = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        if (selectedType === "all") {
            setFilteredIncidents(incidents);
        } else {
            const filteredIncidents = incidents.filter(
                (incident) => incident?.type?.toLowerCase() === selectedType.toLowerCase()
            );
            setFilteredIncidents(filteredIncidents);
        }
    }

    return (
        <div className="px-16 pt-10 font-sans">
            <div className="flex justify-around mb-5 p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="p-4">Resolution Rate: { stats.resolution }%</div>
                <div className="p-4">Active Emergencies: { stats.pending }</div>
                <div className="p-4">Cancellation Rate: { stats.cancellation }%</div>
                <div className="p-4">Dispatched Emergencies: { stats.dispatched }</div>
            </div>
            <div className="flex justify-between mb-3 pt-3">
                <select 
                    className="p-2 text-sm rounded border border-gray-300 outline-none bg-white"
                    onChange={ handleFilterByType}
                >
                    <option value="---">Filter by Types</option>
                    <option value="all">All Types</option>
                    <option value="medical">Medical</option>
                    <option value="fire">Fire</option>
                    <option value="police">Police</option>
                    <option value="Assault">Assault</option>
                </select>
            </div>

            <div className="grid gap-5">
                { filteredIncidents?.map((incident) => (
                    <IncidentCard 
                        incident={ incident } 
                        key={ incident?.id } 
                        incidents={ incidents } 
                        setIncidents={ setIncidents}
                    />
                )) }
            </div>
        </div>
    );
}

export default Dashboard;

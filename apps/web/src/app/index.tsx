import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmergencies } from "actions/emergency";
import { tEmergency } from "types";

import logo from "../assets/logo.svg"; {/* to be removed after */ }

function Dashboard() {
  const [incidents, setIncidents] = useState<tEmergency[]>([]);
  const [stats, setStats] = useState({
    firstResponders: 0,
    secondResponders: 0,
    completedIncidents: 0,
    assignedIncidents: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchIncidents = async () => {
      const emergencies: tEmergency[] = await fetchEmergencies();
      setIncidents(emergencies?.sort((a, b) => b.timestamp - a.timestamp));

      const firstResponders = emergencies.filter((incident) => incident.responders?.first).length;
      const secondResponders = emergencies.filter((incident) => incident.responders?.second).length;
      const completedIncidents = emergencies.filter((incident) => incident.status === "Completed").length;
      const assignedIncidents = emergencies.filter((incident) => incident.status === "Assigned").length;

      setStats({ firstResponders, secondResponders, completedIncidents, assignedIncidents });
    };

    handleFetchIncidents();
  }, []);

  const handleRespond = (incidentId: string) => {
    const updatedIncidents = incidents.map((inc) =>
      inc.id === incidentId ? { ...inc, status: "Responding" } : inc
    );
    setIncidents(updatedIncidents);
    navigate(`/incident/${incidentId}`);
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-center text-2xl font-bold text-gray-800">Active Incidents</h2>
      <div className="flex justify-around mb-5 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="p-4">First Responders: { stats.firstResponders }</div>
        <div className="p-4">Second Responders: { stats.secondResponders }</div>
        <div className="p-4">Completed Incidents: { stats.completedIncidents }</div>
        <div className="p-4">Assigned Incidents: { stats.assignedIncidents }</div>
      </div>
      <div className="flex justify-between mb-5">
        <select className="p-2 rounded border border-gray-300 bg-white">
          <option value="all">All Types</option>
          <option value="medical">Medical</option>
          <option value="fire">Fire</option>
          <option value="police">Police</option>
        </select>
        <select className="p-2 rounded border border-gray-300 bg-white">
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="grid gap-5">
        { incidents?.map((incident) => (
          <div
            key={ incident?.id }
            className={ `flex flex-row justify-between p-5 rounded-lg bg-white shadow-md border-l-8 transition-transform transform hover:scale-105 ${incident?.priority === "Critical" ? "border-red-500" :
              incident?.priority === "High" ? "border-yellow-500" :
                incident?.priority === "Medium" ? "border-blue-500" :
                  "border-green-500"
              }` }
          >

            <div
              className="w-full"
            >
              {/* incident image */ }
              <img src={ logo } alt="logo" style={ { width: '100px', height: '100px' } } className="mx-auto" />
            </div>


            <div className="flex flex-col justify-between mb-2 w-max px-12">
              <span className="font-bold text-lg text-gray-800">{ incident?.type }</span>
              <span className={ `px-3 py-1 rounded text-xs font-bold text-white uppercase ${incident?.status === "Completed" ? "bg-green-500" :
                incident?.status === "Assigned" ? "bg-yellow-500" : "bg-red-500"
                }` }>
                { incident?.status }
              </span>
            </div>

            <div className="mb-2 flex flex-col content-center w-full">
              <a
                href={ `https://www.google.com/maps?q=${incident?.location?.latitude},${incident?.location?.longitude}` }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-bold hover:underline m-auto"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="mb-2 text-gray-600 flex flex-col content-center w-full">
              <p className="m-auto">Reported: { new Date(incident?.timestamp)?.toLocaleString() }</p>
            </div>

            <div className="grid grid-cols-1 content-between w-full pl-20">
              <Link
                className="px-4 py-2 rounded bg-blue-500 text-white text-center font-bold hover:bg-blue-600"
                to={ `/incident/${incident?.id}` }
              >
                View Details
              </Link>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600"
                onClick={ () => handleRespond(incident?.id) }
              >
                Respond
              </button>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}

export default Dashboard;

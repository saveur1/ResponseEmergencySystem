import { tEmergency } from "@/types"
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

interface IncidentCardProps {
    incident: tEmergency,
    setIncidents: React.Dispatch<React.SetStateAction<tEmergency[]>>,
    incidents: tEmergency[]
}
const IncidentCard = ({ incident, setIncidents, incidents }: IncidentCardProps) => {

    let google_maps_link = "";
    
    if (typeof incident?.location !== "string")
        `https://www.google.com/maps?q=${incident?.location?.latitude},${incident?.location?.longitude}`

    return (
        <div
            key={ incident?.id }
            className={ `flex flex-row justify-between p-3 rounded-lg bg-white shadow-md border border-l-8 transition-transform transform ${incident?.priority === "Critical" ? "border-red-500" :
            incident?.priority === "High" ? "border-l-yellow-500" :
                incident?.priority === "Medium" ? "border-l-blue-500" :
                "border-green-500"
            }` }
        >

            <div className="flex w-full gap-x-2">
                {/* incident image */ }
                <img src={ incident?.images?.[0] || logo } alt="logo" width={ 80 } height = {64 } className="w-20 h-16 border border-black/10 rounded" />
                <div className="flex flex-col gap-y-1 justify-center mb-2 w-max">
                    <span className="font-bold text-sm text-gray-800">{ incident?.type }</span>
                    <span className={ `px-3 py-1 rounded text-xs font-bold text-white uppercase ${incident?.status === "resolved" ? "bg-green-500" :
                        incident?.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                        }` }>
                        { incident?.status }
                    </span>
                </div>
            </div>


            

            <div className="mb-2 flex flex-col content-center w-full">
                <a
                    href={ google_maps_link }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-bold hover:underline m-auto text-sm font-outfit"
                >
                    Open in Google Maps
                </a>
            </div>

            <div className="mb-2 text-gray-600 flex flex-col content-center w-full">
                <p className="m-auto italic">Reported: { new Date(incident?.timestamp)?.toLocaleString() }</p>
            </div>

            <div className="w-full flex justify-end items-center">
                <Link
                    className="px-4 py-2 rounded bg-blue-500 text-white text-center font-bold hover:bg-blue-600"
                    to={ `/incident/${incident?.id}` }
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}

export default IncidentCard
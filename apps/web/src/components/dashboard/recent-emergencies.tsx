import { Flame, Droplets, ShieldAlert } from 'lucide-react'

const emergencies = [
  {
    id: 1,
    type: 'fire',
    location: '123 Main St, Kigali',
    time: '10 minutes ago',
    status: 'In Progress',
    icon: Flame,
    iconColor: 'text-red-600',
    responder: 'Fire Team Alpha'
  },
  {
    id: 2,
    type: 'flood',
    location: '45 River Road, Kigali',
    time: '25 minutes ago',
    status: 'Assigned',
    icon: Droplets,
    iconColor: 'text-blue-600',
    responder: 'Rescue Team 2'
  },
  {
    id: 3,
    type: 'assault',
    location: '78 Central Avenue, Kigali',
    time: '42 minutes ago',
    status: 'Resolved',
    icon: ShieldAlert,
    iconColor: 'text-yellow-600',
    responder: 'Police Unit 5'
  },
  {
    id: 4,
    type: 'fire',
    location: '92 Park Lane, Kigali',
    time: '1 hour ago',
    status: 'Resolved',
    icon: Flame,
    iconColor: 'text-red-600',
    responder: 'Fire Team Bravo'
  }
]

export function RecentEmergencies() {
  return (
    <div className="space-y-4">
      {emergencies.map((emergency) => {
        const Icon = emergency.icon
        return (
          <div key={emergency.id} className="flex items-start gap-4">
            <div
              className={`mt-1 rounded-full p-1 ${emergency.iconColor} bg-opacity-10`}
            >
              <Icon className={`h-4 w-4 ${emergency.iconColor}`} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">
                  {emergency.type.charAt(0).toUpperCase() +
                    emergency.type.slice(1)}{' '}
                  Emergency
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    emergency.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : emergency.status === 'Assigned'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {emergency.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {emergency.location}
              </p>
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted-foreground">
                  {emergency.time}
                </p>
                <p className="text-xs font-medium">{emergency.responder}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

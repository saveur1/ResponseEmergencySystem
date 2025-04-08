import { useEffect, useState } from 'react'
import { Filter, MapPin, MoreHorizontal, Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchEmergencies } from '@/actions/emergency'
import { tEmergency } from '@/types'

interface EmergencyDisplay {
  id: string
  type: string
  location: string
  status: string
  time: string
  description: string
  hasMedia: boolean
  hasImages: boolean
  hasVideo: boolean
  hasAudio: boolean
}

const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now()
  const diffInSeconds = Math.floor((now - timestamp) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`
  } else {
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }
}

const EmergenciesTable = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [emergencies, setEmergencies] = useState<EmergencyDisplay[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getEmergencies = async () => {
      try {
        setLoading(true)
        const data = await fetchEmergencies()

        const formattedEmergencies: EmergencyDisplay[] = data.map(
          (emergency: tEmergency) => {
            return {
              id: emergency.id || 'Unknown ID',
              type: emergency.type || 'Unknown',
              location: typeof emergency.location === 'object' && emergency.location !== null
                ? `${emergency.location.latitude.toFixed(4)}, ${emergency.location.longitude.toFixed(4)}`
                : 'Unknown location',
              status: emergency.status || 'pending',
              time: formatRelativeTime(emergency.timestamp),
              description: emergency.description || 'No description provided',
              hasMedia:
                (emergency.images?.length ?? 0) > 0 ,
              hasImages: (emergency.images?.length ?? 0) > 0,
              hasVideo: (emergency.videos?.length ?? 0) > 0,
              hasAudio: false 
            }
          }
        )

        setEmergencies(formattedEmergencies)
        setError(null)
      } catch (err) {
        console.error('Error fetching emergencies:', err)
        setError('Failed to load emergencies. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    getEmergencies()
  }, [])

  const filteredEmergencies = emergencies.filter((emergency) => {
    const matchesSearch =
      emergency.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ||
      emergency.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType =
      typeFilter === 'all' ||
      emergency.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const uniqueEmergencyTypes = Array.from(
    new Set(emergencies.map((emergency) => emergency.type))
  )

  const uniqueStatusTypes = Array.from(
    new Set(emergencies.map((emergency) => emergency.status))
  )

  return (
    <div className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-5 ">
        <div className="relative flex-1 ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search emergencies..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueEmergencyTypes.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Type</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueStatusTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <div className="text-center p-4">Loading emergencies...</div>}
      {error && <div className="text-red-500 text-center p-4">{error}</div>}

      {!loading && !error && (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Media</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmergencies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No emergencies found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmergencies.map((emergency, index) => (
                  <TableRow key={emergency.id}>
                    <TableCell>
                      <div className="text-sm">{index+1}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-black">
                        {emergency.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span>{emergency.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          emergency.status.toLowerCase() === 'active'
                            ? 'destructive'
                            : emergency.status.toLowerCase() === 'responding'
                              ? 'default'
                              : 'outline'
                        }
                      >
                        {emergency.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{emergency.time}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {emergency.hasImages && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-800"
                          >
                            Images
                          </Badge>
                        )}
                        {emergency.hasVideo && (
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-800"
                          >
                            Video
                          </Badge>
                        )}
                        {emergency.hasAudio && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-800"
                          >
                            Audio
                          </Badge>
                        )}
                        {!emergency.hasMedia && (
                          <span className="text-gray-400 text-sm">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='bg-white rounded-[5px]'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Assign responders</DropdownMenuItem>
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default EmergenciesTable
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function EmergencyMap() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Emergency Map</CardTitle>
        <CardDescription>Live view of active emergencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video overflow-hidden rounded-md bg-muted">
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">Map view loading...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

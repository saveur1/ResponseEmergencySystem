import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Settings = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 bg-gray-50 rounded-b-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and system preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Your email" type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                  <Switch
                    id="emergency-alerts"
                    defaultChecked
                    className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="system-notifications">
                    System Notifications
                  </Label>
                  <Switch
                    id="system-notifications"
                    defaultChecked
                    className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    className="data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="system" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-assign">Auto-assign Responders</Label>
                  <Switch
                    id="auto-assign"
                    defaultChecked
                    className="data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="location-tracking">Location Tracking</Label>
                  <Switch
                    id="location-tracking"
                    defaultChecked
                    className="data-[state=checked]:bg-rose-500 data-[state=unchecked]:bg-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">
                    Map Refresh Rate (seconds)
                  </Label>
                  <Input id="refresh-rate" type="number" defaultValue="5" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Settings

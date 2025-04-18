import { Activity, Flame, LifeBuoy, Shield, Users } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsList } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatisticsCards'
import { useEffect, useState } from 'react';
import { generateEmergencyStatistics } from '@/actions/emergency';
import { tEmergency } from '@/types';

interface StatisticsTypes {
    totalEmergencies: number,
    percentageEmergenciesIncreaseFromLastMonth: number,
    totalFireEmergencies: number,
    totalFireEmergenciesFromLast24Hours: number,
    totalAssaultEmergencies: number,
    totalAssaultEmergenciesFromLast24Hours: number,
    totalFloodEmergenciesIncidents: number,
    totalFloodEmergenciesFromLast24Hours: number,
    lastThreeEmergencies: tEmergency[],
}

export default function Dashboard() {
    const [stastics, setStatistics] = useState<StatisticsTypes>();
    useEffect(()=> {
        const fetchStatistics = async()=> {
            const statistics = await generateEmergencyStatistics();
            setStatistics(statistics);
        }

        fetchStatistics()
    }, [])
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex items-center justify-end">
            <TabsList>
              {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
              {/* <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger> */}
            </TabsList>
          </div>

          {/* <TabsContent value="overview" className="space-y-4"> */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Emergencies"
                value={ stastics?.totalEmergencies || 0 }
                icon={Activity}
                description={`${Math.round(stastics?.percentageEmergenciesIncreaseFromLastMonth || 0)}% increase from last month`}
              />
              <StatCard
                title="Fire Emergencies"
                value={ stastics?.totalFireEmergencies || 0 }
                icon={Flame}
                variant="fire"
                description={`${ stastics?.totalFireEmergenciesFromLast24Hours} new in the last 24 hours`}
              />
              <StatCard
                title="Assault Reports"
                value={ stastics?.totalAssaultEmergencies || 0 }
                icon={Shield}
                variant="assault"
                description={`${ stastics?.totalAssaultEmergenciesFromLast24Hours } new in the last 24 hours`}
              />
              <StatCard
                title="Flood Incidents"
                value={ stastics?.totalFloodEmergenciesIncidents || 0}
                icon={LifeBuoy}
                variant="flood"
                description={`${ stastics?.totalFloodEmergenciesFromLast24Hours } new in the last 24 hours`}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Emergency Response Times</CardTitle>
                  <CardDescription>
                    Average response time by emergency type over the last 30
                    days
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Response Time Chart
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Active Responders</CardTitle>
                  <CardDescription>
                    Currently active emergency responders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        name: 'Fire Department',
                        count: 12,
                        icon: Flame,
                        color: 'text-red-600'
                      },
                      {
                        name: 'Assault Department',
                        count: 18,
                        icon: Shield,
                        color: 'text-orange-600'
                      },
                      {
                        name: 'Flood Department',
                        count: 15,
                        icon: Users,
                        color: 'text-blue-600'
                      }
                    ].map((item) => (
                      <div className="flex items-center" key={item.name}>
                        <div
                          className={`mr-2 h-8 w-8 rounded-full flex items-center justify-center ${item.color} bg-muted`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.count} active responders
                          </p>
                        </div>
                        <div className="ml-auto font-medium">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full ">
              <Card className="">
                <CardHeader>
                  <CardTitle>Recent Emergencies</CardTitle>
                  <CardDescription>Latest reported emergencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'Fire',
                        location: 'Kigali Heights',
                        time: '2 minutes ago',
                        status: 'Active',
                        icon: Flame,
                        color: 'bg-red-100 text-red-600'
                      },
                      {
                        type: 'Assault',
                        location: 'Downtown',
                        time: '15 minutes ago',
                        status: 'Responding',
                        icon: Shield,
                        color: 'bg-orange-100 text-orange-600'
                      },
                      {
                        type: 'Flood',
                        location: 'Nyamirambo',
                        time: '1 hour ago',
                        status: 'Resolved',
                        icon: LifeBuoy,
                        color: 'bg-blue-100 text-blue-600'
                      }
                    ].map((emergency, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 rounded-md border p-4"
                      >
                        <div className={`${emergency.color} p-2 rounded-full`}>
                          <emergency.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {emergency.type} Emergency
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {emergency.location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {emergency.time}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              emergency.status === 'Active'
                                ? 'bg-red-100 text-red-800'
                                : emergency.status === 'Responding'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {emergency.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
        </Tabs>
      </div>
    </div>
  )
}

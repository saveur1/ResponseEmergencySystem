export type Emergency = {
    id: string
    type: string
    location: string
    description: string
    icon: string
    images?: string[]
    audio?: string
  }
  
  export type Notification = {
    id: string
    type: string
    title: string
    message: string
    icon: string
    time: string
  }
  
export type tEmergency = {
  id: string;
  type: string;
  location?:
    | {
        longitude: number;
        latitude: number;
      }
    | string;
  description: string;
  timestamp: Date;
  status: string;
  images?: string[];
  videos?: string[];
};

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  icon: string;
  time: string;
};

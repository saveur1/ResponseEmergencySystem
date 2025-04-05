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
  timestamp: number;
  status: string;
  images?: string[];
  videos?: string[];
  priority?: string;
};

export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  icon: string;
  time: string;
};

export interface UserShape {
    id?: string,
    fullName: string,
    email: string,
    role: string,
    password?: string,
    profileImageUrl: string,
    createdAt?: Date
}

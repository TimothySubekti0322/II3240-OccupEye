export interface Data {
    value: number;
    label: string;
    date: string;
  }
  
  export interface DashboardData {
    deviceId: string;
    deviceName: string;
    owner: string;
    currentVisitors: number;
    enteredToday: number;
    enteredThisHour: number;
    enteredByHour: Data[];
    enteredByDay: Data[];
  }
  
  export interface DataShown {
    value: number;
    label: string;
  }

  export interface Data {
    value: number;
    label: string;
  }
  
  export interface Device {
    id: string;
    name: string;
    email: string;
    currentVisitors: number;
    enteredToday: number;
    enteredThisHour: number;
    chartData: { value: number; label: string }[];
  }

  export interface TableData {
    id: string;
    deviceId: string;
    date: string;
    hour: number;
    visitors: number;
    entered: number;
    exited: number;
  }
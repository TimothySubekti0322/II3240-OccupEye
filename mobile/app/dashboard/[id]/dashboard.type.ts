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

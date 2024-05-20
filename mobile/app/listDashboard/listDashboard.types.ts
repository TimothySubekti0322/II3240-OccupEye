export interface Data {
  value: number;
  label: string;
}

export interface Device {
  id: string;
  name: string;
  email: string;
  data: Data[];
  currentVisitors: number;
  enteredToday: number;
  enteredThisHour: number;
}

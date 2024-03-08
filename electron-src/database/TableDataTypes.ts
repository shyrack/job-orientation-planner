export interface ClassData {
  name: string[];
  entry_year: number[];
}

export interface CompanyData {
  name: string[];
  job_occupation: string[];
  timeslot_start: string[];
  timeslot_end: string[];
}

export interface EventData {
  name: string[];
}

export interface StudentData {
  class_id: number[];
  firstname: string[];
  lastname: string[];
}

export interface StudentPreferenceData {
  student_id: number[];
  company_id: number[];
  event_id: number[];
  priority: number[];
}

export interface RoomData {
  name: string[];
  student_capacity: number[];
}

export interface SchedulerData {
  timeslot_start: string[];
  timeslot_end: number[];
}

export interface TimeslotData {
  room_id: number[];
  company_id: number[];
  event_id: number[];
  scheduler_id: number[];
}

export interface StudentAppointmentData {
  student_id: number[];
  timeslot_id: number[];
}

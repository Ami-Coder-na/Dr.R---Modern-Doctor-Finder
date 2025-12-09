export enum Specialty {
  CARDIOLOGIST = 'Cardiologist',
  DERMATOLOGIST = 'Dermatologist',
  NEUROLOGIST = 'Neurologist',
  PEDIATRICIAN = 'Pediatrician',
  DENTIST = 'Dentist',
  ORTHOPEDIC = 'Orthopedic',
  GENERAL_PHYSICIAN = 'General Physician',
  PSYCHIATRIST = 'Psychiatrist'
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  image: string;
  rating: number;
  reviews: number;
  experience: number; // years
  location: string;
  price: number;
  about: string;
  availability: string[];
}

export interface Appointment {
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: string;
  bloodGroup?: string;
}

export interface Appointment {
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface AppointmentDisplay {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  img: string;
  location: string;
  hasReminder?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Medicine Shop Types
export interface Medicine {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  tagColor?: string;
  description?: string;
  sku?: string;
  stock?: boolean;
}

export interface CartItem extends Medicine {
  quantity: number;
}

// Define the structure of a profile
export interface Profile {
    id?: number;  // Make id optional to allow for creation of new profiles
    name: string;
    title: string;
    department: string;
    phone: string;
    email: string;
    about: string;
    courses: string[];
  }
  
  // Type for creating a new profile (without id)
  export type ProfileWithoutId = Omit<Profile, 'id'>;
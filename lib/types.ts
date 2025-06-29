export type Locale = 'en' | 'fa';

export const LOCALES: Locale[] = ['en', 'fa'];
export const DEFAULT_LOCALE: Locale = 'en';

export interface Dictionary {
  auth: {
    login: string;
    email: string;
    password: string;
    submit: string;
    error: string;
    title: string;
    description: string;
    forgotPassword: string;
    googleLogin: string;
    noAccount: string;
    signUp: string;
    invalidCredentials: string;
    accessDenied: string;
    loginSuccess: string;
    signIn: string;
    signingIn: string;
  };
  common: {
    welcome: string;
    darkMode: string;
    lightMode: string;
    language: string;
    english: string;
    persian: string;
    start: string;
  };
  header: {
    appointments: string;
    schedule: string;
    patients: string;
    profile: string;
    settings: string;
    logout: string;
  };
  hero: {
    badge: string;
    title: {
      part1: string;
      part2: string;
    };
    description: string;
    buttons: {
      myAppointments: string;
      viewSchedule: string;
      bookAppointment: string;
      signIn: string;
    };
    trustIndicators: {
      support: string;
      security: string;
      booking: string;
    };
    features: {
      quickBooking: string;
      expertDoctors: string;
      securePrivate: string;
      trustedCare: string;
      support: string;
      findNearby: string;
    };
  };
  doctorHome: {
    title: string;
    description: string;
    badge: string;
    stats: {
      todayAppointments: string;
      activePatients: string;
      hoursToday: string;
    };
  };
  adminHome: {
    title: string;
    description: string;
    badge: string;
    stats: {
      totalUsers: string;
      activeDoctors: string;
      systemHealth: string;
      activeSessions: string;
    };
  };
  pages: {
    admin: {
      title: string;
      description: string;
      features: {
        userManagement: string;
        systemSettings: string;
        reports: string;
        backups: string;
      };
      welcome: string;
      subtitle: string;
    };
    doctor: {
      title: string;
      description: string;
      features: {
        appointments: string;
        patients: string;
        schedule: string;
        prescriptions: string;
      };
      welcome: string;
      subtitle: string;
    };
    client: {
      title: string;
      description: string;
      features: {
        myAppointments: string;
        healthRecords: string;
        prescriptions: string;
        bookNew: string;
      };
      welcome: string;
      subtitle: string;
    };
  };
  error: {
    notImplemented: string;
    404: {
      title: string;
      description: string;
      goHome: string;
    };
    500: {
      title: string;
      description: string;
    };
    403: {
      title: string;
      description: string;
    };
    generic: {
      title: string;
      description: string;
      retry: string;
    };
  };
} 
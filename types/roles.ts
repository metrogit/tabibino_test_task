export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  CLIENT = 'client',
  GUEST = 'guest'
}

// Type guard to check if a string is a valid UserRole
export function isValidRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
} 
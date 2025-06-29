import { NextResponse } from 'next/server';
import { UserRole } from '@/types/roles';

// Mock users database
const mockUsers = {
  'admin@example.com': {
    id: 1,
    name: 'Admin User',
    password: 'password123',
    role: UserRole.ADMIN,
  },
  'doctor@example.com': {
    id: 2,
    name: 'Doctor User',
    password: 'password123',
    role: UserRole.DOCTOR,
  },
  'client@example.com': {
    id: 3,
    name: 'Client User',
    password: 'password123',
    role: UserRole.CLIENT,
  },
  'guest@example.com': {
    id: 4,
    name: 'Guest User',
    password: 'password123',
    role: UserRole.GUEST,
  },
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists and password matches
    const user = mockUsers[email as keyof typeof mockUsers];
    if (user && user.password === password) {
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: email,
          role: user.role,
        },
        token: 'mock-jwt-token',
      });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 
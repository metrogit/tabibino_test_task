declare module 'negotiator' {
  export default class Negotiator {
    constructor(options: { headers: Record<string, string> });
    languages(): string[];
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      accessToken: string;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    email: string;
    role: string;
  }
} 
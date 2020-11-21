export interface User {
  id: number;
  name: string;
  realm: string;
  username: string;
  verificationToken: string;
  emailVerified: boolean;
  role?: string; // 'coach' or 'athlete'
  instagramUsername?: string;
}

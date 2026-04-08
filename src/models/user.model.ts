export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface AuthResponse {
  token: string;
  user: User;
}

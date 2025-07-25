export interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  status: number;
  token: {
    id: number;
    user_id: number;
    token: string;
    created_at: number;
    updated_at: null | number;
    last_used_at: number;
    expires: number;
    phone: null | string;
    position_id: null | number;
    status: number;
    type: null | string;
    user_agent: null | string;
  };
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}

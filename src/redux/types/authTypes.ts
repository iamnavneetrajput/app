// redux/types/authTypes.ts

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// User model
export interface User {
  username: string;
  email: string;
  role: 'admin' | 'user';
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define action types with payloads
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string; user: User };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;  // Error message
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: { token: string; user: User };
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;  // Error message
}

// Action types union
export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | RegisterSuccessAction
  | RegisterFailureAction;

// State type
export interface AuthState {
  token: string | null;
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

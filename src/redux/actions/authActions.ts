// redux/actions/authActions.ts

import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_SUCCESS, REGISTER_FAILURE, AuthActionTypes, User } from '../types/authTypes';

// Action for successful login
export const loginSuccess = (token: string, user: User): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

// Action for failed login
export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action for logout
export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

// Action for successful registration
export const registerSuccess = (token: string, user: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: { token, user },
});

// Action for failed registration
export const registerFailure = (error: string): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// Thunks for login and registration

// User Login
export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/api/login', { email, password });

    // Save the JWT token in localStorage or sessionStorage
    localStorage.setItem('token', data.token);

    // Dispatch login success with token and user data
    dispatch(loginSuccess(data.token, data.user));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

// User Registration
export const registerUser = (email: string, username: string, password: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.post('/api/register', { email, username, password });

    // Save the JWT token in localStorage or sessionStorage
    localStorage.setItem('token', data.token);

    // Dispatch register success with token and user data
    dispatch(registerSuccess(data.token, data.user));
  } catch (error: any) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
};

// User Logout
export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('token'); // Remove token from storage
  dispatch(logout());
};

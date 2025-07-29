/**
 * Authentication Slice
 *
 * This slice manages the authentication state of the application.
 * It handles:
 * - User authentication status
 * - Loading states
 * - Error states
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/**
 * Auth form state
 * @property firstName - The first name of the user
 * @property lastName - The last name of the user
 * @property email - The email of the user
 * @property password - The password of the user
 * @property confirmPassword - The confirmed password of the user
 * @property sex - The sex of the user
 * @property role - The role of the user
 */
export interface AuthFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  sex: string;
  role: string;
  country: string;
  city: string;
  dob: string;
}

/**
 * Initial state for the authentication slice
 */
const initialAuthFormData: AuthFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  sex: '',
  country: '',
  city: '',
  dob: '',
  role: 'patient',
};

/**
 * Authentication State Interface
 * @property isAuthenticated - Whether the user is currently authenticated
 * @property loading - Whether an authentication request is in progress
 * @property signupLoading - Whether a signup request is in progress
 * @property error - Any error message from the last authentication attempt
 * @property authForm - The current state of the auth form
 */
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  signupLoading: boolean;
  error: string | null;
  authForm: AuthFormData;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  signupLoading: false,
  error: null,
  authForm: initialAuthFormData,
};

/**
 * Authentication Slice
 *
 * Actions:
 * - loginRequest: Initiates the login process
 * - loginSuccess: Handles successful login
 * - loginFailure: Handles failed login attempts
 * - signupRequest: Initiates the signup process
 * - signupSuccess: Handles successful signup
 * - signupFailure: Handles failed signup attempts
 * - logout: Handles user logout
 * - otpSuccess: Handles OTP success (OTP sent or verified)
 * - setAuthForm: Handles updating the auth form
 * - clearAuthForm: Handles clearing the auth form
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Initiates the login process
     * @param state - Current state
     * @param action - Payload containing email and password
     */
    loginRequest: (
      state,
      action: PayloadAction<{email: string; password: string}>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    /**
     * Handles successful login
     * @param state - Current state
     */
    loginSuccess: state => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    /**
     * Handles failed login attempts
     * @param state - Current state
     * @param action - Payload containing error message
     */
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /**
     * Initiates the signup process
     * @param state - Current state
     */
    signupRequest: state => {
      state.signupLoading = true;
      state.error = null;
    },
    /**
     * Handles successful signup
     * @param state - Current state
     */
    signupSuccess: state => {
      state.isAuthenticated = true;
      state.signupLoading = false;
      state.error = null;
    },
    /**
     * Handles failed signup attempts
     * @param state - Current state
     * @param action - Payload containing error message
     */
    signupFailure: (state, action: PayloadAction<string>) => {
      state.signupLoading = false;
      state.error = action.payload;
    },
    /**
     * Handles user logout
     * @param state - Current state
     */
    logout: state => {
      state.isAuthenticated = false;
      state.error = null;
    },
    /**
     * Handles OTP success (OTP sent or verified)
     * @param state - Current state
     */
    otpSuccess: state => {
      state.signupLoading = false;
    },
    /**
     * Handles updating the auth form
     * @param state - Current state
     * @param action - Payload containing partial auth form data
     */
    setAuthForm: (state, action: PayloadAction<Partial<AuthFormData>>) => {
      state.authForm = {...state.authForm, ...action.payload};
    },
    /**
     * Handles clearing the auth form
     * @param state - Current state
     */
    clearAuthForm: state => {
      state.authForm = initialAuthFormData;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
  otpSuccess,
  setAuthForm,
  clearAuthForm,
} = authSlice.actions;
export default authSlice.reducer;

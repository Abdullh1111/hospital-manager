/**
 * User Slice
 * 
 * This slice manages the user data state of the application.
 * It handles:
 * - User profile information
 * - Authentication tokens
 * - Token expiration
 * - Loading states
 * - Error states
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/**
 * User Interface
 * @property id - Unique user identifier
 * @property email - User's email address
 * @property firstName - User's first name
 * @property lastName - User's last name
 * @property role - User's role in the system
 * @property accessToken - JWT access token
 * @property refreshToken - JWT refresh token
 * @property expiresIn - Token expiration time in minutes
 * @property expireTimeStamp - Token expiration timestamp
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expireTimeStamp: string;
}

/**
 * User State Interface
 * @property user - User information object
 * @property loading - Whether a user data request is in progress
 * @property error - Any error message from the last user operation
 */
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Initial state for the user slice
 */
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

/**
 * User Slice
 * 
 * Actions:
 * - setUser: Sets the user data
 * - updateUser: Updates specific user fields
 * - clearUser: Clears user data
 * - setLoading: Sets loading state
 * - setError: Sets error state
 * - clearError: Clears error state
 * - updateTokens: Updates authentication tokens
 * - setUserFromSignup: Sets user data from signup response
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Sets the complete user data
     * @param state - Current state
     * @param action - Payload containing user object
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
    /**
     * Updates specific user fields
     * @param state - Current state
     * @param action - Payload containing partial user object
     */
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
      state.error = null;
    },
    /**
     * Clears user data
     * @param state - Current state
     */
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    /**
     * Sets loading state
     * @param state - Current state
     * @param action - Payload containing loading boolean
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    /**
     * Sets error state
     * @param state - Current state
     * @param action - Payload containing error message
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    /**
     * Clears error state
     * @param state - Current state
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Updates authentication tokens
     * @param state - Current state
     * @param action - Payload containing new tokens and expiration
     */
    updateTokens: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      expireTimeStamp: string;
    }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
      state.error = null;
    },
    /**
     * Sets user data from signup response
     * @param state - Current state
     * @param action - Payload containing signup response data
     */
    setUserFromSignup: (state, action: PayloadAction<{
      message: string;
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
      };
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }>) => {
      const { user, accessToken, refreshToken, expiresIn } = action.payload;
      const expireTimeStamp = new Date(Date.now() + expiresIn * 60 * 1000).toISOString(); // Convert minutes to milliseconds and then to ISO string
      
      state.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        accessToken,
        refreshToken,
        expiresIn,
        expireTimeStamp,
      };
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUser,
  clearUser,
  setLoading,
  setError,
  clearError,
  updateTokens,
  setUserFromSignup,
} = userSlice.actions;

export default userSlice.reducer; 
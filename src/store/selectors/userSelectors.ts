/**
 * User Selectors
 * 
 * This file contains selectors for accessing user data from the Redux store.
 * Selectors are functions that extract specific pieces of information from the store state.
 */

import type { RootState } from '../index';
import type { User } from '../slices/userSlice';

/**
 * Selects the complete user object from the store
 * @param state - The complete Redux state
 * @returns The user object or null if not available
 */
export const selectUser = (state: RootState): User | null => state.user.user;

/**
 * Selects the user's access token
 * @param state - The complete Redux state
 * @returns The access token or null if not available
 */
export const selectAccessToken = (state: RootState): string | null => 
  state.user.user?.accessToken || null;

/**
 * Selects the user's refresh token
 * @param state - The complete Redux state
 * @returns The refresh token or null if not available
 */
export const selectRefreshToken = (state: RootState): string | null => 
  state.user.user?.refreshToken || null;

/**
 * Selects the user's ID
 * @param state - The complete Redux state
 * @returns The user ID or null if not available
 */
export const selectUserId = (state: RootState): string | null => 
  state.user.user?.id || null;

/**
 * Selects the user's email
 * @param state - The complete Redux state
 * @returns The user email or null if not available
 */
export const selectUserEmail = (state: RootState): string | null => 
  state.user.user?.email || null;

/**
 * Selects the user's full name (firstName + lastName)
 * @param state - The complete Redux state
 * @returns The user's full name or null if not available
 */
export const selectUserFullName = (state: RootState): string | null => {
  const user = state.user.user;
  if (!user) return null;
  return `${user.firstName} ${user.lastName}`.trim();
};

/**
 * Selects the user's role
 * @param state - The complete Redux state
 * @returns The user role or null if not available
 */
export const selectUserRole = (state: RootState): string | null => 
  state.user.user?.role || null;

/**
 * Selects the token expiration timestamp
 * @param state - The complete Redux state
 * @returns The expiration timestamp or null if not available
 */
export const selectTokenExpiration = (state: RootState): string | null => 
  state.user.user?.expireTimeStamp || null;

/**
 * Checks if the user's token is expired
 * @param state - The complete Redux state
 * @returns True if token is expired, false otherwise
 */
export const selectIsTokenExpired = (state: RootState): boolean => {
  const expiration = selectTokenExpiration(state);
  if (!expiration) return true;
  return new Date() > new Date(expiration);
};

/**
 * Selects the user loading state
 * @param state - The complete Redux state
 * @returns True if user data is loading, false otherwise
 */
export const selectUserLoading = (state: RootState): boolean => state.user.loading;

/**
 * Selects the user error state
 * @param state - The complete Redux state
 * @returns The error message or null if no error
 */
export const selectUserError = (state: RootState): string | null => state.user.error; 
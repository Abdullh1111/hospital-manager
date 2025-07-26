import { describe, it, expect } from '@jest/globals';
import userReducer, { setUserFromSignup, UserState } from '../userSlice';

describe('userSlice', () => {
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };

  describe('setUserFromSignup', () => {
    it('should set user data from signup response', () => {
      const signupResponse = {
        message: 'Registration completed successfully',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
        },
        accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: '123e4567-e89b-12d3-a456-426614174000',
        expiresIn: 1440,
      };

      const action = setUserFromSignup(signupResponse);
      const newState = userReducer(initialState, action);

      expect(newState.user).toBeTruthy();
      expect(newState.user?.id).toBe(signupResponse.user.id);
      expect(newState.user?.email).toBe(signupResponse.user.email);
      expect(newState.user?.firstName).toBe(signupResponse.user.firstName);
      expect(newState.user?.lastName).toBe(signupResponse.user.lastName);
      expect(newState.user?.role).toBe(signupResponse.user.role);
      expect(newState.user?.accessToken).toBe(signupResponse.accessToken);
      expect(newState.user?.refreshToken).toBe(signupResponse.refreshToken);
      expect(newState.user?.expiresIn).toBe(signupResponse.expiresIn);
      expect(typeof newState.user?.expireTimeStamp).toBe('string');
      const date = new Date(newState.user?.expireTimeStamp || '');
      expect(!isNaN(date.getTime())).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    it('should calculate expireTimeStamp correctly', () => {
      const signupResponse = {
        message: 'Registration completed successfully',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
        },
        accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: '123e4567-e89b-12d3-a456-426614174000',
        expiresIn: 1440, // 24 hours in minutes
      };

      const action = setUserFromSignup(signupResponse);
      const newState = userReducer(initialState, action);

      const expectedExpireTime = new Date(Date.now() + 1440 * 60 * 1000);
      const actualExpireTime = newState.user?.expireTimeStamp ? new Date(newState.user.expireTimeStamp) : null;

      // Allow for a small time difference (1 second) due to test execution time
      expect(actualExpireTime?.getTime()).toBeCloseTo(expectedExpireTime.getTime(), -3);
    });
  });
}); 
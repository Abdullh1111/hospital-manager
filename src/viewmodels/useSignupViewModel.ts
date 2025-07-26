import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import axiosInstance from '../axiosInstance';
import { URLS } from '../constants/urls';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../constants/paths';
import { signupRequest, signupSuccess, signupFailure, otpSuccess } from '../store/slices/authSlice';
import { setUserFromSignup } from '../store/slices/userSlice';
import { setAuthForm, clearAuthForm } from '../store/slices/authSlice';
import { RootState } from '../store';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * A view model hook for the Signup screen.
 * It encapsulates the state and logic for handling user registration,
 * including form fields for full name, email, password, and confirm password.
 *
 * @param navigation - The navigation prop from React Navigation.
 * @returns An object containing the state variables, their setters, and the signup handler function.
 */
export const useSignupViewModel = (navigation: any) => {
  const dispatch = useDispatch();
  const authForm = useSelector((state: RootState) => state.auth.authForm);
  const { firstName, lastName, email, password, confirmPassword, sex, role } = authForm;

  const { t } = useTranslation();

  // Get signup loading state from auth store
  const { signupLoading } = useSelector((state: RootState) => state.auth);

  // Setters for signup form fields (dispatch to Redux)
  const setFirstName = React.useCallback((value: string) => dispatch(setAuthForm({ firstName: value })), [dispatch]);
  const setLastName = React.useCallback((value: string) => dispatch(setAuthForm({ lastName: value })), [dispatch]);
  const setEmail = React.useCallback((value: string) => dispatch(setAuthForm({ email: value })), [dispatch]);
  const setPassword = React.useCallback((value: string) => dispatch(setAuthForm({ password: value })), [dispatch]);
  const setSex = React.useCallback((value: string) => dispatch(setAuthForm({ sex: value })), [dispatch]);
  const setRole = React.useCallback((value: string) => dispatch(setAuthForm({ role: value })), [dispatch]);
  const setConfirmPassword = React.useCallback((value: string) => dispatch(setAuthForm({ confirmPassword: value })), [dispatch]);

  /**
   * Handles the signup process.
   * It validates that the passwords match and will dispatch a signup action.
   * Currently, it navigates to the OTP screen for verification upon successful validation.
   */
  const handleSignup = useCallback(async () => {
    if (!firstName.trim()) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.enterFirstName', 'Please enter your first name')
      );
      return;
    }
    if (!lastName.trim()) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.enterLastName', 'Please enter your last name')
      );
      return;
    }
    if (!email.trim()) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.enterYourEmail', 'Please enter your email address')
      );
      return;
    }
    // Block plus addressing: local part must not contain '+'
    const emailRegex = /^[^\s@+]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.enterValidEmail', 'Please enter a valid email address')
      );
      return;
    }
    if (!sex) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.selectSex', 'Please select your gender')
      );
      return;
    }
    if (password.length < 8) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.passwordTooShort', 'Password must be at least 8 characters long')
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        t('missingData', 'Missing Data'),
        t('errors.passwordsDoNotMatch', 'Passwords do not match')
      );
      return;
    }

    // Dispatch signup request action
    dispatch(signupRequest());

    try {
      const sendOTPResponse = await axiosInstance.post(URLS.sendOTP, { email: email.trim() });
      dispatch(otpSuccess());
      Alert.alert(
        t('success', 'Success'),
        sendOTPResponse.data.message
      );
      navigation.navigate(PATHS.AUTH.OTP, { email, password });
    } catch (err: any) {
      // Dispatch signup failure action
      const errorMessage = err?.response?.data?.message || t('errors.failedToSendResetLink', 'Failed to send reset link. Please try again.');
      dispatch(signupFailure(errorMessage));

      Alert.alert(
        t('error', 'An error occurred'),
        errorMessage
      );
    }
  }, [firstName, lastName, email, sex, password, confirmPassword, navigation, t, dispatch]);

  const handleSignupSubmitAfterOTP = useCallback(async (Otp: string) => {
    // Dispatch signup request action
    dispatch(signupRequest());

    try {
      const data = {
        email: email?.trim(),
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        sex,
        role,
        password,
      };

      const response = await axiosInstance.post(
        URLS.register,
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `X-OTP ${data.email}:${Otp}`,
          },
        }
      );

      // Dispatch signup success action
      dispatch(setUserFromSignup(response.data));
      dispatch(signupSuccess());
      dispatch(clearAuthForm());
      // Store user in AsyncStorage
      const userToStore = {
        id: response.data.user.id,
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        role: response.data.user.role,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        expireTimeStamp: new Date(Date.now() + response.data.expiresIn * 60 * 1000).toISOString(),
      };
      await AsyncStorage.setItem('user', JSON.stringify(userToStore));
      Alert.alert(
        t('success', 'Success'),
        response.data.message || 'Registration successful'
      );
      navigation.replace(PATHS.Main, { screen: PATHS.MAIN.HomeStackScreen });
    } catch (err: any) {
      // Dispatch signup failure action
      const errorMessage = err?.response?.data?.message || t('errors.failedToRegister', 'Registration failed');
      dispatch(signupFailure(errorMessage));

      Alert.alert(
        t('error', 'An error occurred'),
        errorMessage
      );
    }
  }, [email, firstName, lastName, sex, role, password, dispatch, t, navigation]);

  // Business logic for form validation
  const emailRegex = React.useMemo(() => /^[^\s@+]+@[^\s@]+\.[^\s@]+$/, []);
  const isFormValid = React.useMemo(() => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    return (
      trimmedFirstName &&
      trimmedLastName &&
      trimmedEmail &&
      emailRegex.test(trimmedEmail) &&
      sex &&
      password.length >= 8 &&
      password === confirmPassword
    );
  }, [firstName, lastName, email, sex, password, confirmPassword, emailRegex]);

  // Memoize the returned object to prevent unnecessary re-renders
  return useMemo(() => ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
    sex,
    setSex,
    role,
    setRole,
    handleSignupSubmitAfterOTP,
    signupLoading,
    isFormValid,
  }), [
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
    sex,
    setSex,
    role,
    setRole,
    dispatch,
    handleSignupSubmitAfterOTP,
    signupLoading,
    isFormValid,
  ]);
}; 
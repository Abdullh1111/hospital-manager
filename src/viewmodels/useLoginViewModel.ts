import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { PATHS } from '../constants/paths';

// TODO: The navigation prop is temporarily typed as `any` to avoid a type mismatch
// that occurs due to the nested navigation structure. When the `LoginScreen` was moved
// into the `AuthStack`, its navigation prop changed from the `RootStack`'s navigation
// to the `AuthStack`'s navigation. However, this view model still needs to access
// `navigation.replace('Main')`, which is part of the `RootStack`. This should be
// refactored, for example, by handling the navigation logic in the navigator itself
// based on the authentication state.
export const useLoginViewModel = (
  navigation: any
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace(PATHS.Main);
    }
  }, [isAuthenticated, navigation]);

  /**
   * Navigates to the OTP screen, passing the email and password as parameters.
   * This allows the OTP screen to perform the login action after successful verification.
   */
  const handleLogin = () => {
    navigation.navigate(PATHS.AUTH.OTP, { email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}; 
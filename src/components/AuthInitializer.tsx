import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../store/selectors/userSelectors';
import { loginSuccess } from '../store/slices/authSlice';
import { RootState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../store/slices/userSlice';

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => selectAccessToken(state));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(loginSuccess());
    }
  }, [token, dispatch, isAuthenticated]);

  useEffect(() => {
    const loadUser = async () => {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          dispatch(setUser(user));
        } catch (e) {
          // handle error if needed
        }
      }
    };
    loadUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer; 
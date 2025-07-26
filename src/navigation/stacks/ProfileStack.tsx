import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/ProfileScreen';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from '../AppNavigator';
import HeaderAuthButton from './HeaderAuthButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: t('profile', 'Profile'),
          headerRight: () => <HeaderAuthButton navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack; 
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsScreen from '../../screens/AppointmentsScreen';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from '../AppNavigator';
import HeaderAuthButton from './HeaderAuthButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppointmentsStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: t('appointments', 'Appointments'),
          headerRight: () => <HeaderAuthButton navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStack; 
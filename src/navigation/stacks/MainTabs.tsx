import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AppointmentsStack from './AppointmentsStack';
import ProfileStack from './ProfileStack';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="HomeStackScreen" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStackScreen" component={HomeStack} options={{ title: t('home', 'Home') }} />
      <Tab.Screen name="AppointmentsStackScreen" component={AppointmentsStack} options={{ title: t('appointments', 'Appointments') }} />
      <Tab.Screen name="ProfileStackScreen" component={ProfileStack} options={{ title: t('profile', 'Profile') }} />
    </Tab.Navigator>
  );
};

export default MainTabs; 
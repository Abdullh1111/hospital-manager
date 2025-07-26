import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const AppointmentsScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('appointments', 'Appointments')}</Text>
    </View>
  );
};

export default AppointmentsScreen; 
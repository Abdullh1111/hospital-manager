import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../constants/colors';
import { useSelector } from 'react-redux';
import { selectUserFullName, selectUserEmail } from '../store/selectors/userSelectors';
import { RootState } from '../store';

const HomeScreen = () => {
  const { t } = useTranslation();
  const userFullName = useSelector(selectUserFullName);
  const userEmail = useSelector(selectUserEmail);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Currently no state, but hook is ready for future logic
  useHomeViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('welcome', 'Welcome to Hospital Manager')}</Text>
      {userFullName && userEmail && isAuthenticated && (
        <Text style={styles.name}>{userFullName}:{userEmail}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: COLORS.primary,
  },
});

export default HomeScreen; 
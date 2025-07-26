import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../constants/colors';
import CustomDropdown from '../components/CustomDropdown';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'العربية', value: 'ar' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile', 'Profile')}</Text>
      <Text style={styles.label}>{t('language', 'Language')}</Text>
      <CustomDropdown
        value={selectedLanguage}
        onValueChange={handleLanguageChange}
        options={languageOptions}
        placeholder="Select Language"
        style={styles.dropdown}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
  },
});

export default ProfileScreen; 
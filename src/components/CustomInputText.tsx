import {t} from 'i18next';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {COLORS} from '../constants/colors';

type InputTextProps = {
  children?: React.ReactNode;
  label: string;
  placeholder: string;
  style?: object;
  quteText?: string;
  ref?: any;
} & TextInputProps;

export default function CustomInputText({
  children,
  label,
  placeholder,
  style,
  quteText,
  ref,
  ...props
}: InputTextProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}

        style={[
          styles.input,
          isFocused && styles.inputFocused,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="next"
        autoCapitalize="words"
        {...props}
      />
      {quteText && <Text style={styles.quteText}>{t(quteText, quteText)}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  quteText: {
    fontSize: 14,
    color: '#677171',
    marginTop: 5,
    fontWeight: 400,
  },

  label: {
    fontSize: 16,
    color: '#1A2A2B',
    marginBottom: 5,
    fontWeight: 500,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.black,
  },

  inputFocused: {
    borderColor: COLORS.primary,
  },
});

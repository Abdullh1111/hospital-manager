import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colors';

interface SubmitButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const SubmitButton: React.FC<SubmitButtonProps> = React.memo(({ 
  onPress, 
  disabled = false, 
  loading = false, 
  children, 
  style 
}) => {
  const isEnabled = !disabled && !loading;
  
  // Memoize the button style to prevent recalculation on every render
  const buttonStyle: ViewStyle = useMemo(() => ({
    backgroundColor: isEnabled ? COLORS.primary : COLORS.disabled,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    opacity: isEnabled ? 1 : 0.7,
    ...(style || {}),
  }), [isEnabled, style]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={!isEnabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        typeof children === 'string' ? (
          <Text style={styles.buttonText}>{children}</Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubmitButton; 
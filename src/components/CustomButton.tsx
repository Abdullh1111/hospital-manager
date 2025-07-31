import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface SubmitButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomButton: React.FC<SubmitButtonProps> = React.memo(
  ({onPress, disabled = false, loading = false, children, style, ...props}) => {
    const isEnabled = !disabled && !loading;

    const buttonStyle: ViewStyle = useMemo(
      () => ({
        backgroundColor: isEnabled ? COLORS.primary : COLORS.disabled,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        opacity: isEnabled ? 1 : 0.7,
        ...(style || {}),
      }),
      [isEnabled, style],
    );

    const textStyle: TextStyle = useMemo(
      () => ({
        color: isEnabled ? COLORS.white : '#AEB3B3',
        fontSize: 18,
        fontWeight: 'bold',
      }),
      [isEnabled],
    );

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={!isEnabled}
        activeOpacity={0.8}
        {...props}
        >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  },
);

export default CustomButton;

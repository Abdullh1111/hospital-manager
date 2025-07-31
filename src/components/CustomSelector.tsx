import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CustomSelectorRef } from '../types/CustomSelector.interface';
import BottomSheet from './BottomSheet';

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  options: DropdownOption[];
  label: string;
  placeholder?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const CustomSelector = React.memo(
  React.forwardRef<CustomSelectorRef, CustomDropdownProps>(
    (
      {
        value,
        onValueChange,
        options,
        placeholder = 'Select an option',
        style,
        disabled = false,
        label,
      },
      ref,
    ) => {
      const [isVisible, setIsVisible] = useState(false);
      const [tempValue, setTempValue] = useState<string>(value);

      const selectedOption = useMemo(
        () => options.find(opt => opt.value === value),
        [value, options],
      );

      const handleSelect = useCallback((option: DropdownOption) => {
        setTempValue(option.value);
      }, []);

      const handleSave = () => {
        if (tempValue !== value) {
          onValueChange(tempValue);
        }
        setIsVisible(false);
      };

      const handleOpenDropdown = useCallback(() => {
        if (!disabled) {
          setTempValue(value); // Sync current value to temp
          setIsVisible(true);
        }
      }, [disabled, value]);

      useImperativeHandle(ref, () => ({
        openDropdown: handleOpenDropdown,
      }));

      return (
        <>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity
            style={[styles.dropdown, disabled && styles.disabled, style]}
            onPress={handleOpenDropdown}
            disabled={disabled}>
            <Text
              style={[
                styles.dropdownText,
                !selectedOption && styles.placeholderText,
              ]}>
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>

          <BottomSheet
            visible={isVisible}
            snapPoints={[100 * 0.6, 100 * 0.3, 100 * 0.1, 0]}
            initialSnapPoint={1}
            onSnap={(index: number) => {
              if (index === 0) {
                setIsVisible(false);
              }
            }}>
            <View style={styles.bottomSheet}>
              <Text style={styles.sheetTitle}>{placeholder}</Text>

              <ScrollView style={styles.optionsScroll}>
                {options.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.optionRow}
                    onPress={() => handleSelect(option)}>
                    <Text
                      style={[
                        styles.optionLabel,
                        option.value === tempValue && styles.selectedLabel,
                      ]}>
                      {option.label}
                    </Text>
                    {option.value === tempValue ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : (
                      <View style={styles.notSelectedMark} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </>
      );
    },
  ),
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#1A2A2B',
    marginBottom: 5,
    fontWeight: '500',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  disabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.gray,
  },
  arrow: {
    fontSize: 12,
    color: COLORS.gray,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    maxHeight: '60%',
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: COLORS.black,
  },
  optionsScroll: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3ff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.white,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
  notSelectedMark: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#dfdfdfff',
    borderRadius: 100,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomSelector;

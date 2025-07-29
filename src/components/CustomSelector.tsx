import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {CustomSelectorRef} from '../types/CustomSelector.interface';

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  options: DropdownOption[];
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
      },
      ref,
    ) => {
      const [isVisible, setIsVisible] = useState(false);

      const selectedOption = useMemo(
        () => options.find(opt => opt.value === value),
        [value, options],
      );

      const handleSelect = useCallback(
        (option: DropdownOption) => {
          onValueChange(option.value);
          setIsVisible(false);
        },
        [onValueChange],
      );

      const handleOpenDropdown = useCallback(() => {
        if (!disabled) {
          setIsVisible(true);
        }
      }, [disabled]);

      const handleCloseDropdown = () => setIsVisible(false);

      useImperativeHandle(ref, () => ({
        openDropdown: handleOpenDropdown,
      }));

      return (
        <>
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

          <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={handleCloseDropdown}>
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPress={handleCloseDropdown}
            />
            <View style={styles.bottomSheet}>
              <View style={styles.dragHandle} />
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
                        option.value === value && styles.selectedLabel,
                      ]}>
                      {option.label}
                    </Text>
                    {option.value === value ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : (
                      <View style={styles.notSelectedMark} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleCloseDropdown}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      );
    },
  ),
);

const styles = StyleSheet.create({
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
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
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

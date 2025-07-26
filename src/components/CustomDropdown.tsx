import React, { useCallback, useMemo, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/colors';

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

export interface CustomDropdownRef {
  openDropdown: () => void;
}

const CustomDropdown = React.memo(React.forwardRef<CustomDropdownRef, CustomDropdownProps>(({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  style,
  disabled = false,
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Memoize the selected option to prevent recalculation
  const selectedOption = useMemo(() => 
    options.find(option => option.value === value), 
    [options, value]
  );

  // Memoize the handle select function
  const handleSelect = useCallback((option: DropdownOption) => {
    onValueChange(option.value);
    setIsVisible(false);
  }, [onValueChange]);

  // Memoize the open dropdown function
  const handleOpenDropdown = useCallback(() => {
    if (!disabled) {
      setIsVisible(true);
    }
  }, [disabled]);

  // Memoize the close dropdown function
  const handleCloseDropdown = useCallback(() => {
    setIsVisible(false);
  }, []);

  // useImperativeHandle is used here to expose the openDropdown method to parent components via ref,
  // allowing the parent to programmatically open the dropdown (e.g., after submitting the previous input).
  useImperativeHandle(ref, () => ({
    openDropdown: handleOpenDropdown,
  }));

  return (
    <>
      <TouchableOpacity
        style={[
          styles.dropdown,
          disabled && styles.disabled,
          style,
        ]}
        onPress={handleOpenDropdown}
        disabled={disabled}
      >
        <Text style={[
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
        animationType="fade"
        onRequestClose={handleCloseDropdown}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={handleCloseDropdown}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity
                onPress={handleCloseDropdown}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    option.value === value && styles.selectedOption,
                    index === options.length - 1 && styles.lastOption // To match the bottom border radius of the container modal
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  <Text style={[
                    styles.optionText,
                    option.value === value && styles.selectedOptionText,
                  ]}>
                    {option.label}
                  </Text>
                  {option.value === value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}));

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  optionsContainer: {
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.overlay,
  },
  lastOption: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  optionText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default CustomDropdown; 
// CustomDatePicker.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { Icon } from "react-native-paper";

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity
        onPress={showDatePicker}
        className="flex-1"
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#E55D7D", "#6B46E6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-row items-center justify-between w-full px-3 py-3 border-2 border-white rounded-lg"
        >
          <Text style={styles.text}>
            {selectedDate
              ? moment(selectedDate).format("DD - MM - YYYY")
              : "Select a date"}
          </Text>
          <Icon source="chevron-down" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomDatePicker;

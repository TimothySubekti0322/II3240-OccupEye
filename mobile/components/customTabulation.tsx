import { StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-paper";

interface CustomTabulationProps {
  setSelectedValue: (value: string | null) => void;
  items: { label: string; value: string }[];
  label: string;
  labelValue: string | null;
}

const CustomTabulation: React.FC<CustomTabulationProps> = ({
  setSelectedValue,
  items,
  label,
  labelValue,
}) => {
  return (
    <LinearGradient
      colors={["#E55D7D", "#6B46E6"]}
      className="w-[48%] mt-4 border-2 border-white rounded-lg"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={items}
        placeholder={{
          label: label,
          value: labelValue,
        }}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          placeholder: { color: "white" },
          iconContainer: styles.iconContainer,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Icon source="chevron-down" size={24} color="white" />;
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  placeholder: {
    color: "white",
  },
  iconContainer: {
    height: "100%",
    justifyContent: "center",
    paddingRight: 8,
  },
});

export default CustomTabulation;

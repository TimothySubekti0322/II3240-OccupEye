import { View, Text, Image } from "react-native";
import IMAGE from "../static/image";
import React from "react";

interface TextDataIconProps {
  title: string;
  value: number;
}

const TextDataIcon: React.FC<TextDataIconProps> = ({ title, value }) => {
  return (
    <>
      <Text className="mt-6 text-lg text-white font-SyneBold">{title}</Text>
      <View className="flex-row items-center mt-1">
        <Text className="ml-1 text-2xl text-white font-SyneBold">{value}</Text>
        <Image
          source={IMAGE.person}
          className="w-8 h-8"
          style={{ resizeMode: "contain" }}
        />
      </View>
    </>
  );
};

export default TextDataIcon;

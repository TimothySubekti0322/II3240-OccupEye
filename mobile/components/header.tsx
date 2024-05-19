import { View, Image } from "react-native";
import React from "react";
import IMAGE from "../static/image";
import { Icon } from "react-native-paper";

const Header = () => {
  return (
    <View className="flex-row items-center justify-between w-full h-24 px-6 mb-4">
      <Image
        source={IMAGE.logo}
        className="w-16"
        style={{ resizeMode: "contain" }}
      />
      <Icon source="account-circle" size={60} color="white" />
    </View>
  );
};

export default Header;

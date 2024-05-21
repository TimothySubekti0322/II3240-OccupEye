import { View, Image, Pressable, Text, Alert } from "react-native";
import React from "react";
import IMAGE from "../static/image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Header = () => {
  const signOutHandler = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      router.push("../login");
    } catch (error) {
      Alert.alert("Error", error as string, [{ text: "OK" }]);
    }
  };
  return (
    <View className="flex-row items-center justify-between w-full h-24 px-6 mb-4">
      <Image
        source={IMAGE.logo}
        className="w-16"
        style={{ resizeMode: "contain" }}
      />
      <View className="w-24 bg-[#93063E] rounded-xl overflow-hidden">
        <Pressable
          className="items-center justify-center py-4"
          android_ripple={{ color: "#71031C" }}
          onPress={() => signOutHandler()}
        >
          <Text className="text-white font-SyneBold ">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

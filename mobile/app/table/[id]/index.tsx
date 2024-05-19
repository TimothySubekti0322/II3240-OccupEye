import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../../components/header";
import IMAGE from "../../../static/image";
import DashboardTable from "../../../components/dashboardTable";

const Table = () => {
  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <LinearGradient
          // Background Linear Gradient
          colors={["#181C24", "#11306F"]}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <Header />
        <View className="flex-1 px-6">
          <View className="w-full flex-1 border-white border-[2px] rounded-xl pt-6 px-4 pb-8 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Pressable onPress={() => backHandler()}>
                <Image source={IMAGE.back} className="w-10 h-10" />
              </Pressable>

              <LinearGradient
                colors={["#6B46E6", "#E7A856"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-[70%] self-center items-center border-white border-[2px] py-2 rounded-lg"
              >
                <Text className="text-white font-SyneBold">
                  Dashboard Toko Tuki
                </Text>
              </LinearGradient>

              <Pressable>
                <Image source={IMAGE.edit} className="w-8 h-8" />
              </Pressable>
            </View>

            {/* Table */}
            <DashboardTable />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Table;

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../../../static/image";
import { Icon } from "react-native-paper";
import TextDataIcon from "../../../components/textDataIcon";
import CustomTabulation from "../../../components/customTabulation";
import CustomDatePicker from "../../../components/customDatePicker";
import BarChartComponent from "../../../components/barCharts";

const sort = [
  { label: "Highest", value: "highest" },
  { label: "lowest", value: "lowest" },
];

const filter = [
  {
    label: "daily",
    value: "daily",
  },
];

const data = [
  { value: 100, label: "7" },
  { value: 90, label: "9" },
  { value: 50, label: "11" },
  { value: 70, label: "13" },
  { value: 60, label: "15" },
  { value: 40, label: "17" },
  { value: 30, label: "19" },
  { value: 20, label: "21" },
  { value: 10, label: "23" },
  { value: 15, label: "3" },
  { value: 5, label: "5" },
  { value: 7, label: "7" },
];

const Dashboard = () => {
  const { id } = useLocalSearchParams();
  console.log(id);

  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const seeCompleteTableHandler = () => {
    router.push("../../table/dummyIDTable");
  };

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
        <View className="flex-row items-center justify-between w-full h-24 px-6 mb-4">
          <Image
            source={IMAGE.logo}
            className="w-16"
            style={{ resizeMode: "contain" }}
          />
          <Icon source="account-circle" size={60} color="white" />
        </View>
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full border-white border-[2px] rounded-xl pt-6 px-4 pb-8 mb-8">
            <View className="flex-row items-center justify-between">
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

              <Pressable className="invisible">
                <View className="w-8 h-8"></View>
              </Pressable>
            </View>

            {/* Current Visitor */}
            <TextDataIcon title="Current Visitors:" value={43} />

            {/* Daily Total */}
            <TextDataIcon title="Daily Total:" value={200} />

            {/* Hourly Total */}
            <TextDataIcon title="Hourly Total:" value={49} />

            {/* Custom Tabulation */}
            <Text className="mt-12 text-lg text-white font-SyneBold">
              Custom Tabulation
            </Text>

            <View className="flex-row items-center justify-between">
              <CustomTabulation
                setSelectedValue={setSelectedSort}
                items={sort}
                label="Sort By"
                labelValue={null}
              />

              <CustomTabulation
                setSelectedValue={setSelectedFilter}
                items={filter}
                label="hourly"
                labelValue={null}
              />
            </View>
            <View className="flex-row items-center justify-between mt-6">
              <View className="flex-row items-center w-[75%] pr-4">
                <Text className="mr-2 text-lg text-white font-SyneBold">
                  Date
                </Text>
                <CustomDatePicker onDateChange={setSelectedDate} />
              </View>
              <View className="flex-row items-center flex-1">
                <Text className="text-4xl text-white font-SyneBold">43</Text>
                <Image
                  source={IMAGE.person}
                  className="w-12 h-12"
                  style={{ resizeMode: "contain" }}
                />
              </View>
            </View>
            <Text className="mt-12 text-lg text-white font-SyneBold">
              Last 24 hours:
            </Text>

            <View className="pr-4">
              <BarChartComponent data={data} />
            </View>

            <TouchableOpacity
              onPress={() => seeCompleteTableHandler()}
              className="self-center mt-8 overflow-hidden rounded-lg"
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#E55D7D", "#6B46E6"]}
                className="items-center px-4 py-2 border-2 border-white rounded-lg"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-lg text-white font-SyneBold">
                  See Complete Table
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;

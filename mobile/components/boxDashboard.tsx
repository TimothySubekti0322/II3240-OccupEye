import { Image, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../static/image";
import BarChartComponent from "./barCharts";
import React from "react";
import { router } from "expo-router";

export type ChartData = { value: number; label: string }[];

interface BoxDashboardProps {
  id: string;
  title: string;
  currentVisitor: number;
  dailyTotal: number;
  hourlyTotal: number;
  chartData: ChartData;
}

const BoxDashboard: React.FC<BoxDashboardProps> = ({
  id,
  title,
  currentVisitor,
  dailyTotal,
  hourlyTotal,
  chartData,
}) => {
  const goToDashboardHandler = () => {
    router.push(`../dashboard/${id}`);
  };
  return (
    <View className="w-full border-white border-[2px] rounded-xl pt-4 px-4 pb-8 mb-8">
      <Pressable className="w-full" onPress={() => goToDashboardHandler()}>
        <LinearGradient
          colors={["#6B46E6", "#E7A856"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-4/5 self-center items-center border-white border-[1px] py-2"
        >
          <Text className="text-lg text-white font-SyneBold">{title}</Text>
        </LinearGradient>
      </Pressable>

      {/* Current Visitor */}
      <Text className="mt-6 text-lg text-white font-SyneBold">
        Current Visitors:
      </Text>
      <View className="flex-row items-center mt-1">
        <Text className="ml-1 text-2xl text-white font-SyneBold">
          {currentVisitor}
        </Text>
        <Image
          source={IMAGE.person}
          className="w-8 h-8"
          style={{ resizeMode: "contain" }}
        />
      </View>

      {/* Daily Total and Hourly TOtal */}
      <View className="flex-row justify-between mt-6">
        <View className="">
          <Text className="text-lg text-white font-SyneBold">Daily Total:</Text>
          <View className="flex-row items-center">
            <Text className="ml-1 text-2xl text-white font-SyneBold">
              {dailyTotal}
            </Text>
            <Image
              source={IMAGE.person}
              className="w-8 h-8"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>
        <View className="pr-4">
          <Text className="text-lg text-white font-SyneBold">
            Hourly Total:
          </Text>
          <View className="flex-row items-center">
            <Text className="ml-1 text-2xl text-white font-SyneBold">
              {hourlyTotal}
            </Text>
            <Image
              source={IMAGE.person}
              className="w-8 h-8"
              style={{ resizeMode: "contain" }}
            />
          </View>
        </View>
      </View>

      {/* Chart */}
      <Text className="mt-6 text-lg text-white font-SyneBold">
        Last 24 hours:
      </Text>

      <View className="pr-4">
        <BarChartComponent data={chartData} />
      </View>
    </View>
  );
};

export default BoxDashboard;

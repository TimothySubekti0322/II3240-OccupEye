import { View, Text, ScrollView } from "react-native";
import React from "react";
import data from "../static/dummyTableData";

const DashboardTable = () => {
  return (
    <ScrollView
      className="w-full"
      horizontal={true}
      contentContainerStyle={{ flexDirection: "column" }}
      showsHorizontalScrollIndicator={false}
    >
      {/* Table Head */}
      <View className="flex-row items-center h-10">
        <Text className="pl-4 text-center text-white w-44 font-SyneBold">
          Date
        </Text>
        <Text className="w-40 text-center text-white font-SyneBold">Hour</Text>
        <Text className="text-center text-white w-36 font-SyneBold">
          Visitors
        </Text>
        <Text className="text-center text-white w-36 font-SyneBold">
          Entered
        </Text>
        <Text className="text-center text-white w-36 font-SyneBold">
          Exited
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Table Body */}
        {data.map((item, index) => (
          <View key={index} className={`flex-row items-center h-10`}>
            <Text className="pl-4 text-center text-white font-SyneBold w-44">
              {item.date}
            </Text>
            <Text className="w-40 text-center text-white font-SyneBold">
              {item.hour}
            </Text>
            <Text className="text-center text-white font-SyneBold w-36">
              {item.visitors}
            </Text>
            <Text className="text-center text-white font-SyneBold w-36">
              {item.entered}
            </Text>
            <Text className="text-center text-white font-SyneBold w-36">
              {item.exited}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default DashboardTable;

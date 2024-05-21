// BarChartComponent.tsx
import React, { useEffect } from "react";
import { Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import type { ChartData } from "./boxDashboard";
import { Text } from "react-native";

const width = Dimensions.get("window").width;

interface BarChartComponentProps {
  data: ChartData;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data = [] }) => {
  const dataShown = data.map((item) => ({
    ...item,
    topLabelComponent: () => (
      <Text style={{ color: "#ffffff" }}>{item.value}</Text>
    ),
  }));

  return (
    <ScrollView className="w-full mt-5">
      <BarChart
        data={dataShown}
        frontColor={"#ffffff"}
        topLabelTextStyle={{ color: "#ffffff" }}
        yAxisColor={"#ffffff"}
        xAxisColor={"#ffffff"}
        xAxisLabelTextStyle={{ color: "#ffffff" }}
        yAxisTextStyle={{ color: "#ffffff" }}
        isAnimated={true}
      />
    </ScrollView>
  );
};

export default BarChartComponent;

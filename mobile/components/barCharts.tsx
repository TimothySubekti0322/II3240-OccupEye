// BarChartComponent.tsx
import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import type { ChartData } from "./boxDashboard";

const width = Dimensions.get("window").width;

interface BarChartComponentProps {
  data: ChartData;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ScrollView className="w-full mt-5">
      <BarChart
        data={data}
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

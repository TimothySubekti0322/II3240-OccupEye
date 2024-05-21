import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import data from "../static/dummyTableData";
import axios from "axios";
import API from "../static/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hourFormatter } from "../utils/dateFormatter";
import { ActivityIndicator } from "react-native-paper";

interface DashboardTableProps {
  id: string;
}

interface TableData {
  id: string;
  deviceId: string;
  date: string;
  hour: number;
  visitors: number;
  entered: number;
  exited: number;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TableData[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API}/api/table/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator animating={true} color="#FFFFFF" size="large" />
        </View>
      ) : (
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
            <Text className="w-40 text-center text-white font-SyneBold">
              Hour
            </Text>
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
            {data?.map((item, index) => (
              <View key={index} className={`flex-row items-center h-10`}>
                <Text className="pl-4 text-center text-white font-SyneBold w-44">
                  {item.date.split("T")[0]}
                </Text>
                <Text className="w-40 text-center text-white font-SyneBold">
                  {hourFormatter(item.hour)}
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
      )}
    </>
  );
};

export default DashboardTable;

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../../../static/image";
import { ActivityIndicator, Icon } from "react-native-paper";
import TextDataIcon from "../../../components/textDataIcon";
import CustomTabulation from "../../../components/customTabulation";
import CustomDatePicker from "../../../components/customDatePicker";
import BarChartComponent from "../../../components/barCharts";
import type { DashboardData, Data } from "./dashboard.type";
import type { ChartData } from "../../../components/boxDashboard";
import axios from "axios";
import API from "../../../static/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getNumberOfDaysInMonthFromString,
  convertTZ,
} from "../../../utils/dateFormatter";

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

  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(convertTZ());

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const [originalShowedData, setOriginalShowedData] = useState<ChartData>(data);

  const [showedData, setShowedData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const seeCompleteTableHandler = () => {
    router.push(`../../table/${id}`);
  };

  const backHandler = () => {
    router.back();
  };

  // Initialize Data
  useEffect(() => {
    //Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API}/api/dashboard/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data.data);

        console.log(
          "selectedDate = ",
          selectedDate.toISOString().split("T")[0]
        );

        // Set showed data
        const currentDate = selectedDate.toISOString().split("T")[0];
        console.log("currentDate = ", currentDate);
        const enteredByHour = response.data.data.enteredByHour;

        // get all Data for current date
        let dataShownFiltered: Data[] = enteredByHour.filter(
          (data: Data) => data.date == currentDate
        );

        if (dataShownFiltered.length == 0) {
          for (let hour = 0; hour < 24; hour++) {
            const hourLabel = `${hour}:00`;
            dataShownFiltered.push({ value: 0, label: hourLabel, date: "" });
          }
        }

        // Remove date from data
        const dataShown = dataShownFiltered.map(({ date, ...rest }) => rest);
        setShowedData(dataShown);
        setOriginalShowedData(dataShown);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Custom Tabulation
  useEffect(() => {
    if (selectedSort == null) {
      setShowedData(originalShowedData);
    } else if (selectedSort == "highest") {
      const sortedData = [...originalShowedData].sort(
        (a, b) => b.value - a.value
      );
      setShowedData(sortedData);
    } else if (selectedSort == "lowest") {
      const sortedData = [...originalShowedData].sort(
        (a, b) => a.value - b.value
      );
      setShowedData(sortedData);
    }
  }, [selectedSort]);

  useEffect(() => {
    if (selectedFilter == "hourly") {
      console.log("selectedDate = ", selectedDate);
      const currentDate = selectedDate?.toISOString().split("T")[0];
      console.log("currentDate = ", currentDate);
      const enteredByHour = dashboardData?.enteredByHour;

      // get all Data for current date
      if (enteredByHour == null) return;

      let dataShownFiltered: Data[] = enteredByHour?.filter(
        (data: Data) => data.date == currentDate
      );

      if (dataShownFiltered.length == 0) {
        for (let hour = 0; hour < 24; hour++) {
          const hourLabel = `${hour}:00`;
          dataShownFiltered.push({ value: 0, label: hourLabel, date: "" });
        }
      }

      if (selectedSort == "highest") {
        const sortedData = [...dataShownFiltered].sort(
          (a, b) => b.value - a.value
        );
        dataShownFiltered = sortedData;
      } else if (selectedSort == "lowest") {
        const sortedData = [...dataShownFiltered].sort(
          (a, b) => a.value - b.value
        );
        dataShownFiltered = sortedData;
      }

      // Remove date from data
      const dataShown = dataShownFiltered.map(({ date, ...rest }) => rest);
      setShowedData(dataShown);
      setOriginalShowedData(dataShown);
    } else {
      const currentDate = selectedDate?.toISOString().split("T")[0];
      const currentMonth = currentDate?.split("-")[1];
      const enteredByDay = dashboardData?.enteredByDay;

      // get all Data for current date
      if (enteredByDay == null) return;
      let dataShownFiltered: Data[] = enteredByDay.filter(
        (data: Data) => data.date.split("-")[1] == currentMonth
      );

      if (dataShownFiltered.length == 0) {
        for (
          let day = 1;
          day <= getNumberOfDaysInMonthFromString(currentDate);
          day++
        ) {
          const dayLabel = `${day}`;
          dataShownFiltered.push({ value: 0, label: dayLabel, date: "" });
        }
      } else {
        if (selectedSort == "highest") {
          const sortedData = [...dataShownFiltered].sort(
            (a, b) => b.value - a.value
          );
          dataShownFiltered = sortedData;
        } else if (selectedSort == "lowest") {
          const sortedData = [...dataShownFiltered].sort(
            (a, b) => a.value - b.value
          );
          dataShownFiltered = sortedData;
        }
      }

      // Remove date from data
      const dataShown = dataShownFiltered.map(({ date, ...rest }) => rest);
      setShowedData(dataShown);
      setOriginalShowedData(dataShown);
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (selectedDate == null) return;
    const currentDate = selectedDate?.toISOString().split("T")[0];

    // Check if selected filter is hourly
    if (selectedFilter == "hourly") {
      const enteredByHour = dashboardData?.enteredByHour;

      // get all Data for current date
      if (enteredByHour == null) return;

      let dataShownFiltered: Data[] = enteredByHour?.filter(
        (data: Data) => data.date == currentDate
      );

      if (dataShownFiltered.length == 0) {
        for (let hour = 0; hour < 24; hour++) {
          const hourLabel = `${hour}:00`;
          dataShownFiltered.push({ value: 0, label: hourLabel, date: "" });
        }
      }

      if (selectedSort == "highest") {
        const sortedData = [...dataShownFiltered].sort(
          (a, b) => b.value - a.value
        );
        dataShownFiltered = sortedData;
      } else if (selectedSort == "lowest") {
        const sortedData = [...dataShownFiltered].sort(
          (a, b) => a.value - b.value
        );
        dataShownFiltered = sortedData;
      }

      // Remove date from data
      const dataShown = dataShownFiltered.map(({ date, ...rest }) => rest);
      setShowedData(dataShown);
      setOriginalShowedData(dataShown);
    }

    // Check if selected filter is daily
    else if (selectedFilter == "daily") {
      const enteredByDay = dashboardData?.enteredByDay;

      // get all Data for current date
      if (enteredByDay == null) return;

      let dataShownFiltered: Data[] = enteredByDay.filter(
        (data: Data) => data.date.split("-")[1] == currentDate.split("-")[1]
      );

      if (dataShownFiltered.length == 0) {
        for (
          let day = 1;
          day <= getNumberOfDaysInMonthFromString(currentDate);
          day++
        ) {
          const dayLabel = `${day}`;
          dataShownFiltered.push({ value: 0, label: dayLabel, date: "" });
        }
      } else {
        if (selectedSort == "highest") {
          const sortedData = [...dataShownFiltered].sort(
            (a, b) => b.value - a.value
          );
          dataShownFiltered = sortedData;
        } else if (selectedSort == "lowest") {
          const sortedData = [...dataShownFiltered].sort(
            (a, b) => a.value - b.value
          );
          dataShownFiltered = sortedData;
        }
      }

      // Remove date from data
      const dataShown = dataShownFiltered.map(({ date, ...rest }) => rest);
      setShowedData(dataShown);
      setOriginalShowedData(dataShown);
    }
  }, [selectedDate]);

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
        {loading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator
              size="large"
              color="#fff"
              className="self-center"
            />
          </View>
        ) : (
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
                    {dashboardData?.deviceName}
                  </Text>
                </LinearGradient>

                <Pressable className="invisible">
                  <View className="w-8 h-8"></View>
                </Pressable>
              </View>

              {/* Current Visitor */}
              <TextDataIcon
                title="Current Visitors:"
                value={dashboardData?.currentVisitors ?? 0}
              />

              {/* Daily Total */}
              <TextDataIcon
                title="Daily Total:"
                value={dashboardData?.enteredToday ?? 0}
              />

              {/* Hourly Total */}
              <TextDataIcon
                title="Hourly Total:"
                value={dashboardData?.enteredThisHour ?? 0}
              />

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
                  labelValue="hourly"
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
                  <Text className="text-4xl text-white font-SyneBold">
                    {dashboardData?.currentVisitors ?? 0}
                  </Text>
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
                {showedData !== null && <BarChartComponent data={showedData} />}
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
        )}
      </SafeAreaView>
    </>
  );
};

export default Dashboard;

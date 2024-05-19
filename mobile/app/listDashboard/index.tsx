import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../../static/image";
import { Icon, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxDashboard from "../../components/boxDashboard";

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

const ListDashboard = () => {
  const addHandler = () => {
    console.log("Add button pressed");
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
        <ScrollView className="flex-1 px-6">
          <Text className="mb-4 text-lg text-white font-SyneBold">
            Welcome, nadira.
          </Text>

          {/* Box 1*/}
          <BoxDashboard
            title="Dashboard Toko Tuki"
            currentVisitor={43}
            dailyTotal={200}
            hourlyTotal={49}
            chartData={data}
          />

          {/* Box 2 */}
          <BoxDashboard
            title="Dashboard Toko Tuktuk"
            currentVisitor={43}
            dailyTotal={200}
            hourlyTotal={49}
            chartData={data}
          />

          {/* Add Dashboard */}
          <View className="w-full border-white border-[2px] rounded-xl pt-4 px-4 pb-4 mb-8">
            <Text className="text-lg text-white font-SyneBold">
              Add Dashboard:
            </Text>
            <View className="flex-row items-center w-full mt-2">
              <TextInput className="flex-1 h-10 rounded-lg" />
              <TouchableOpacity
                onPress={() => addHandler()}
                className="w-1/5 h-10 ml-2 overflow-hidden rounded-lg border-[2px] border-white"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#6B46E6", "#E7A856"]}
                  className="items-center justify-center py-2 rounded-lg"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="h-10 text-lg text-center text-white font-SyneBold">
                    Add
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ListDashboard;

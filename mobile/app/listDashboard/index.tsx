import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
  TextInput,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../../static/image";
import {
  ActivityIndicator,
  PaperProvider,
  Portal,
  Modal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxDashboard from "../../components/boxDashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import type { Device } from "./listDashboard.types";
import axios from "axios";
import API from "../../static/API";

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
  const [name, setName] = useState<string | null>("");
  const [device, setDevice] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [newDashboardId, setNewDashboardId] = useState<string>("");
  const [newDashboardName, setNewDashboardName] = useState<string>("");

  const addDashboardHandler = async () => {
    const form = {
      id: newDashboardId,
      name: newDashboardName,
    };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${API}/api/device`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 201) {
        console.log("Berhasil");
        setNewDashboardId("");
        setNewDashboardName("");

        hideModal();

        ToastAndroid.show("Dashboard Succesfully Added ✅", ToastAndroid.SHORT);

        setLoading(true);

        // Fetch Device
        const response = await axios.get(`${API}/api/listDashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200) {
          setDevice(response.data.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      } else if (response.data.status == 400) {
        Alert.alert("Error", response.data.message, [{ text: "OK" }]);
      }
    } catch (error) {
      Alert.alert("Error", error as string, [{ text: "OK" }]);
    } finally {
      hideModal();
    }
  };

  const signOutHandler = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      router.push("../login");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Name
        const name = await AsyncStorage.getItem("name");
        setName(name);

        // Fetch Device
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API}/api/listDashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setDevice(response.data.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", error as string, [{ text: "OK" }]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <PaperProvider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 20,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <Text className="self-center text-xl font-SyneBold">
              Dashboard Name
            </Text>
            <TextInput
              className="h-10 bg-[#DDDDDD] border-2 border-[#AAAAAA] rounded-lg mt-6 px-3"
              onChangeText={(text) => setNewDashboardName(text)}
            />
            <TouchableOpacity
              onPress={() => addDashboardHandler()}
              className="w-3/5 self-center mt-6 py-3 overflow-hidden rounded-lg border-[2px] border-white"
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#6B46E6", "#E7A856"]}
                className="items-center justify-center py-2 rounded-lg"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-lg text-center text-white font-SyneBold">
                  Add
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Modal>
        </Portal>
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
            {/* <Icon source="account-circle" size={60} color="white" /> */}
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

          {loading ? (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator
                size="large"
                color="#fff"
                className="self-center"
              />
            </View>
          ) : (
            <ScrollView className="flex-1 px-6">
              <Text className="mb-4 text-lg text-white font-SyneBold">
                Welcome, {name}.
              </Text>

              {device?.map((item) => (
                <BoxDashboard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  currentVisitor={item.currentVisitors}
                  dailyTotal={item.enteredToday}
                  hourlyTotal={item.enteredThisHour}
                  chartData={item.data}
                />
              ))}

              {/* Add Dashboard */}
              <View className="w-full border-white border-[2px] rounded-xl pt-4 px-4 pb-4 mb-8">
                <Text className="text-lg text-white font-SyneBold">
                  Add Dashboard:
                </Text>
                <View className="flex-row items-center w-full mt-2">
                  <TextInput
                    className="flex-1 h-10 px-3 bg-white rounded-lg"
                    onChangeText={(text) => setNewDashboardId(text)}
                  />
                  <TouchableOpacity
                    onPress={() => showModal()}
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
          )}
        </SafeAreaView>
      </PaperProvider>
    </>
  );
};

export default ListDashboard;

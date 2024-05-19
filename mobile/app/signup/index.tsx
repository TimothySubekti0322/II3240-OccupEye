import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IMAGE from "../../static/image";
import { useState } from "react";

const initialFormState = {
  email: "",
  name: "",
  password: "",
};

const SingUp = () => {
  const [formState, setFormState] = useState(initialFormState);

  const onChange = (key: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const signup = () => {
    console.log("SingUp button pressed");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <View className="items-center flex-1">
        <LinearGradient
          // Background Linear Gradient
          colors={["#181C24", "#11306F"]}
          className="absolute top-0 bottom-0 left-0 right-0"
        />
        <View className="items-center w-full">
          <Image
            source={IMAGE.mainLogo}
            className="w-3/5  mt-[10%]"
            style={{ resizeMode: "contain" }}
          />
        </View>
        <Text className="-mt-16 text-2xl text-white font-SyneBold">
          An eye for your visitors.
        </Text>
        <View className="flex-1 mt-16 w-full px-[12.5%] items-center">
          <Text className="self-start w-3/5 text-xl text-white font-SyneBold">
            Email:
          </Text>
          <LinearGradient
            colors={["#6B46E6", "#E7A856"]}
            className="w-full rounded-lg border-2 p-[2px] pb-[4px] mt-2"
          >
            <TextInput
              className="w-full p-2 bg-white rounded-lg"
              onChangeText={(text) => onChange("email", text)}
            />
          </LinearGradient>

          <Text className="self-start w-3/5 mt-6 text-xl text-white font-SyneBold">
            Name:
          </Text>
          <LinearGradient
            colors={["#6B46E6", "#E7A856"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-lg border-2 p-[2px] pb-[4px] mt-2"
          >
            <TextInput
              className="w-full p-2 bg-white rounded-lg"
              onChangeText={(text) => onChange("name", text)}
            />
          </LinearGradient>

          <Text className="self-start w-3/5 mt-6 text-xl text-white font-SyneBold">
            Password:
          </Text>
          <LinearGradient
            colors={["#6B46E6", "#E7A856"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-lg border-2 p-[2px] pb-[4px] mt-2"
          >
            <TextInput
              className="w-full p-2 bg-white rounded-lg"
              onChangeText={(text) => onChange("password", text)}
            />
          </LinearGradient>

          {/* SingUp Button */}
          <TouchableOpacity
            onPress={() => signup()}
            className="w-1/2 mt-12 overflow-hidden rounded-lg"
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6B46E6", "#E7A856"]}
              className="items-center py-2 rounded-lg"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-lg text-white font-SyneBold">Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Link
            href="../login"
            className="text-white text-[16px] underline underline-offset-6 font-SyneBold mt-12"
          >
            Log in instead
          </Link>
        </View>
      </View>
    </>
  );
};

export default SingUp;
